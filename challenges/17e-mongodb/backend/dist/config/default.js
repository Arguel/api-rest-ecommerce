"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const factory_persistence_enum_1 = require("../common/types/factory.persistence.enum");
// Enable environment variables
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const defaultConfig = {
    server: {
        port: process.env.PORT || 3000,
        domain: 'localhost',
        /**
         * Persistence is equal to:
         * 'memory' | 'filesystem' | 'mysql' | 'sqlite3' | 'mongolocal' | 'mongoatlas' | 'firebase';
         */
        persistence: process.env.PERSISTENCE || factory_persistence_enum_1.EPersistenceType.mongoatlas,
        mode: process.env.MODE,
    },
    databases: {
        mongolocal: {
            port: process.env.MONGO_LOCAL_PORT || 27017,
            host: process.env.MONGO_LOCAL_HOST || '0.0.0.0',
            database: process.env.MONGO_LOCAL_DB || 'mongolocaldb',
        },
        mongoatlas: {
            user: process.env.MONGO_ATLAS_USER || 'user',
            password: process.env.MONGO_ATLAS_PASSWORD || 'password',
            clusterurl: process.env.MONGO_ATLAS_CLUSTER_URL || 'clusterurl',
            database: process.env.MONGO_ATLAS_DB || 'mongoatlasdb',
        },
    },
};
exports.default = defaultConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZy9kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLHVGQUE0RTtBQUU1RSwrQkFBK0I7QUFDL0IsTUFBTSxZQUFZLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7SUFDdEIsTUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDO0NBQzFCO0FBRUQsTUFBTSxhQUFhLEdBQUc7SUFDcEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUk7UUFDOUIsTUFBTSxFQUFFLFdBQVc7UUFDbkI7OztXQUdHO1FBQ0gsV0FBVyxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLDJDQUFnQixDQUFDLFVBQVU7UUFDbkUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSTtLQUN2QjtJQUNELFNBQVMsRUFBRTtRQUNULFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLEtBQUs7WUFDM0MsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLElBQUksU0FBUztZQUMvQyxRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLElBQUksY0FBYztTQUN2RDtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixJQUFJLE1BQU07WUFDNUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLElBQUksVUFBVTtZQUN4RCxVQUFVLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsSUFBSSxZQUFZO1lBQy9ELFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsSUFBSSxjQUFjO1NBQ3ZEO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsa0JBQWUsYUFBYSxDQUFDIn0=