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
        persistence: factory_persistence_enum_1.EPersistenceType.filesystem,
    },
    databases: {
        mongolocal: {
            port: 27017,
            host: 'localhost',
        },
    },
};
exports.default = defaultConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZy9kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBQzVCLHVGQUE0RTtBQUU1RSwrQkFBK0I7QUFDL0IsTUFBTSxZQUFZLEdBQUcsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUNyQyxJQUFJLFlBQVksQ0FBQyxLQUFLLEVBQUU7SUFDdEIsTUFBTSxZQUFZLENBQUMsS0FBSyxDQUFDO0NBQzFCO0FBRUQsTUFBTSxhQUFhLEdBQUc7SUFDcEIsTUFBTSxFQUFFO1FBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUk7UUFDOUIsTUFBTSxFQUFFLFdBQVc7UUFDbkI7OztXQUdHO1FBQ0gsV0FBVyxFQUFFLDJDQUFnQixDQUFDLFVBQVU7S0FDekM7SUFDRCxTQUFTLEVBQUU7UUFDVCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxXQUFXO1NBQ2xCO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsa0JBQWUsYUFBYSxDQUFDIn0=