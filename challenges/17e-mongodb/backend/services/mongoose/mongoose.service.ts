import mongoose from 'mongoose';
import debug from 'debug';
import { Global } from './types/memory.server.interface';
import MongoMemoryServer from 'mongodb-memory-server-core';
import config from 'config';
import { TKeys } from '../../common/types/factory.persistence.enum';
// import { MongoClient } from 'mongodb';

const log: debug.IDebugger = debug('app:mongoose-service');

declare const global: Global;

class MongooseService {
  private count = 0;
  private mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    useFindAndModify: false,
  };
  // mongoatlas
  private atlasUser = config.get<string>('databases.mongoatlas.user');
  private atlasPassword = config.get<string>('databases.mongoatlas.password');
  private atlasClusterUrl = config.get<string>(
    'databases.mongoatlas.clusterurl'
  );
  private atlasDatabase = config.get<string>('databases.mongoatlas.database');
  // mongolocal
  private localHost = config.get<string>('databases.mongolocal.host');
  private localPort = config.get<string>('databases.mongolocal.port');
  private localDatabase = config.get<string>('databases.mongolocal.database');
  // persistence type
  private persistence = config.get<TKeys>('server.persistence');

  constructor() {
    this.connectWithRetry();
  }

  public getMongoose() {
    return mongoose;
  }

  public async getTestServer(): Promise<string> {
    const instance: MongoMemoryServer = await MongoMemoryServer.create();
    const uri: string = instance.getUri();
    global.__MONGOINSTANCE__ = instance;
    return uri.slice(0, uri.lastIndexOf('/'));
  }

  public getMongoUrl = async (type: TKeys): Promise<string> => {
    if (process.env.NODE_ENV === 'test') {
      const testServer: string = await this.getTestServer();
      return `${testServer}/${this.atlasDatabase}`;
    }

    const localUrl = `mongodb://${this.localHost}:${this.localPort}/${this.localDatabase}`;
    const atlasUrl = `mongodb+srv://${this.atlasUser}:${this.atlasPassword}@${this.atlasClusterUrl}/${this.atlasDatabase}?retryWrites=true&w=majority`;

    return type === 'mongolocal' ? localUrl : atlasUrl;
  };

  public connectWithRetry = async () => {
    try {
      log('Attempting MongoDB connection (will retry if needed)');
      const url: string = await this.getMongoUrl(this.persistence);
      const mongoInstance = await mongoose.connect(url, this.mongooseOptions);
      log('MongoDB is connected');
      return mongoInstance.connection.getClient();
    } catch (err) {
      const retrySeconds = 5;
      log(
        `MongoDB connection unsuccessful (will retry #${++this
          .count} after ${retrySeconds} seconds):`,
        err
      );
      setTimeout(this.connectWithRetry, retrySeconds * 1000);
    }
  };
}
export default new MongooseService();
