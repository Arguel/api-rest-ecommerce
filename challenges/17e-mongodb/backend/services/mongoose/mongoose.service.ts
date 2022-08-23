import mongoose from 'mongoose';
import debug from 'debug';
import { Global } from './types/memory.server.interface';
import MongoMemoryServer from 'mongodb-memory-server-core';

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

  constructor() {
    this.connectWithRetry();
  }

  getMongoose() {
    return mongoose;
  }

  async getTestServer() {
    const instance = await MongoMemoryServer.create();
    const uri = instance.getUri();
    global.__MONGOINSTANCE__ = instance;
    return uri.slice(0, uri.lastIndexOf('/'));
  }

  connectWithRetry = async () => {
    try {
      log('Attempting MongoDB connection (will retry if needed)');
      await mongoose.connect(
        'mongodb://localhost:27017/api-db',
        this.mongooseOptions
      );
      log('MongoDB is connected');
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
