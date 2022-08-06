"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Enable environment variables
const dotenvResult = dotenv_1.default.config();
if (dotenvResult.error) {
    throw dotenvResult.error;
}
const defaultConfig = {
    server: {
        port: process.env.PORT || '3000',
        domain: 'localhost',
    },
};
exports.default = defaultConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2NvbmZpZy9kZWZhdWx0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLCtCQUErQjtBQUMvQixNQUFNLFlBQVksR0FBRyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBQ3JDLElBQUksWUFBWSxDQUFDLEtBQUssRUFBRTtJQUN0QixNQUFNLFlBQVksQ0FBQyxLQUFLLENBQUM7Q0FDMUI7QUFFRCxNQUFNLGFBQWEsR0FBRztJQUNwQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTTtRQUNoQyxNQUFNLEVBQUUsV0FBVztLQUNwQjtDQUNGLENBQUM7QUFFRixrQkFBZSxhQUFhLENBQUMifQ==