"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const base_error_1 = __importDefault(require("./error/base.error"));
const log = (0, debug_1.default)('error-handler');
class ErrorHandler {
    handleError(err) {
        log(err);
    }
    isTrustedError(error) {
        return error instanceof base_error_1.default && error.isOperational;
    }
}
exports.default = new ErrorHandler();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuaGFuZGxlci5jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9jb21tb24vZXJyb3IuaGFuZGxlci5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxrREFBMEI7QUFDMUIsb0VBQTJDO0FBRTNDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxlQUFlLENBQUMsQ0FBQztBQUVwRCxNQUFNLFlBQVk7SUFDVCxXQUFXLENBQUMsR0FBVTtRQUMzQixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRU0sY0FBYyxDQUFDLEtBQVk7UUFDaEMsT0FBTyxLQUFLLFlBQVksb0JBQVMsSUFBSSxLQUFLLENBQUMsYUFBYSxDQUFDO0lBQzNELENBQUM7Q0FDRjtBQUVELGtCQUFlLElBQUksWUFBWSxFQUFFLENBQUMifQ==