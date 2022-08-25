"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const mongodb_memory_server_core_1 = __importDefault(require("mongodb-memory-server-core"));
const config_1 = __importDefault(require("config"));
// import { MongoClient } from 'mongodb';
const log = (0, debug_1.default)('app:mongoose-service');
class MongooseService {
    constructor() {
        this.count = 0;
        this.mongooseOptions = { serverSelectionTimeoutMS: 5000 };
        // mongoatlas
        this.atlasUser = config_1.default.get('databases.mongoatlas.user');
        this.atlasPassword = config_1.default.get('databases.mongoatlas.password');
        this.atlasClusterUrl = config_1.default.get('databases.mongoatlas.clusterurl');
        this.atlasDatabase = config_1.default.get('databases.mongoatlas.database');
        // mongolocal
        this.localHost = config_1.default.get('databases.mongolocal.host');
        this.localPort = config_1.default.get('databases.mongolocal.port');
        this.localDatabase = config_1.default.get('databases.mongolocal.database');
        // persistence type
        this.persistence = config_1.default.get('server.persistence');
        this.getMongoUrl = (type) => __awaiter(this, void 0, void 0, function* () {
            if (process.env.NODE_ENV === 'test') {
                const testServer = yield this.getTestServer();
                return `${testServer}/${this.atlasDatabase}`;
            }
            const localUrl = `mongodb://${this.localHost}:${this.localPort}/${this.localDatabase}`;
            const atlasUrl = `mongodb+srv://${this.atlasUser}:${this.atlasPassword}@${this.atlasClusterUrl}/${this.atlasDatabase}?retryWrites=true&w=majority`;
            return type === 'mongolocal' ? localUrl : atlasUrl;
        });
        this.connectWithRetry = () => __awaiter(this, void 0, void 0, function* () {
            try {
                log('Attempting MongoDB connection (will retry if needed)');
                const url = yield this.getMongoUrl(this.persistence);
                const mongoInstance = yield mongoose_1.default.connect(url, this.mongooseOptions);
                log('MongoDB is connected');
                return mongoInstance.connection.getClient();
            }
            catch (err) {
                const retrySeconds = 5;
                log(`MongoDB connection unsuccessful (will retry #${++this
                    .count} after ${retrySeconds} seconds):`, err);
                setTimeout(this.connectWithRetry, retrySeconds * 1000);
            }
        });
        this.connectWithRetry();
    }
    getTestServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const instance = yield mongodb_memory_server_core_1.default.create();
            const uri = instance.getUri();
            global.__MONGOINSTANCE__ = instance;
            return uri.slice(0, uri.lastIndexOf('/'));
        });
    }
    getMongoose() {
        return mongoose_1.default;
    }
}
exports.default = new MongooseService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9uZ29vc2Uuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NlcnZpY2VzL21vbmdvb3NlL21vbmdvb3NlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFDaEMsa0RBQTBCO0FBRTFCLDRGQUEyRDtBQUMzRCxvREFBNEI7QUFFNUIseUNBQXlDO0FBRXpDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBSTNELE1BQU0sZUFBZTtJQWlCbkI7UUFoQlEsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLG9CQUFlLEdBQUcsRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsQ0FBQztRQUM3RCxhQUFhO1FBQ0wsY0FBUyxHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFTLDJCQUEyQixDQUFDLENBQUM7UUFDNUQsa0JBQWEsR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBUywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3BFLG9CQUFlLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQ2xDLGlDQUFpQyxDQUNsQyxDQUFDO1FBQ00sa0JBQWEsR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBUywrQkFBK0IsQ0FBQyxDQUFDO1FBQzVFLGFBQWE7UUFDTCxjQUFTLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQVMsMkJBQTJCLENBQUMsQ0FBQztRQUM1RCxjQUFTLEdBQUcsZ0JBQU0sQ0FBQyxHQUFHLENBQVMsMkJBQTJCLENBQUMsQ0FBQztRQUM1RCxrQkFBYSxHQUFHLGdCQUFNLENBQUMsR0FBRyxDQUFTLCtCQUErQixDQUFDLENBQUM7UUFDNUUsbUJBQW1CO1FBQ1gsZ0JBQVcsR0FBRyxnQkFBTSxDQUFDLEdBQUcsQ0FBUSxvQkFBb0IsQ0FBQyxDQUFDO1FBYXZELGdCQUFXLEdBQUcsQ0FBTyxJQUFXLEVBQW1CLEVBQUU7WUFDMUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQUU7Z0JBQ25DLE1BQU0sVUFBVSxHQUFXLE1BQU0sSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN0RCxPQUFPLEdBQUcsVUFBVSxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQzthQUM5QztZQUVELE1BQU0sUUFBUSxHQUFHLGFBQWEsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUN2RixNQUFNLFFBQVEsR0FBRyxpQkFBaUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGFBQWEsOEJBQThCLENBQUM7WUFFbkosT0FBTyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztRQUNyRCxDQUFDLENBQUEsQ0FBQztRQUVLLHFCQUFnQixHQUFHLEdBQVMsRUFBRTtZQUNuQyxJQUFJO2dCQUNGLEdBQUcsQ0FBQyxzREFBc0QsQ0FBQyxDQUFDO2dCQUM1RCxNQUFNLEdBQUcsR0FBVyxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLGFBQWEsR0FBRyxNQUFNLGtCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3hFLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUM1QixPQUFPLGFBQWEsQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7YUFDN0M7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLFlBQVksR0FBRyxDQUFDLENBQUM7Z0JBQ3ZCLEdBQUcsQ0FDRCxnREFBZ0QsRUFBRSxJQUFJO3FCQUNuRCxLQUFLLFVBQVUsWUFBWSxZQUFZLEVBQzFDLEdBQUcsQ0FDSixDQUFDO2dCQUNGLFVBQVUsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsWUFBWSxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ3hEO1FBQ0gsQ0FBQyxDQUFBLENBQUM7UUF0Q0EsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQztJQUVZLGFBQWE7O1lBQ3hCLE1BQU0sUUFBUSxHQUFzQixNQUFNLG9DQUFpQixDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3JFLE1BQU0sR0FBRyxHQUFXLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUN0QyxNQUFNLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDO1lBQ3BDLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FBQTtJQWdDTSxXQUFXO1FBQ2hCLE9BQU8sa0JBQVEsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFDRCxrQkFBZSxJQUFJLGVBQWUsRUFBRSxDQUFDIn0=