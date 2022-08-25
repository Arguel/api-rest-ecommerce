"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const base_error_1 = __importDefault(require("../error/base.error"));
class BadRequestError extends base_error_1.default {
    constructor(message = 'BAD_REQUEST', methodName = '') {
        super('', message, methodName, http_status_1.default.BAD_REQUEST, true);
    }
}
exports.BadRequestError = BadRequestError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkLnJlcXVlc3QuZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9jb21tb24vZXJyb3IvYmFkLnJlcXVlc3QuZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsOERBQXFDO0FBQ3JDLHFFQUE0QztBQUU1QyxNQUFhLGVBQWdCLFNBQVEsb0JBQVM7SUFDNUMsWUFBWSxPQUFPLEdBQUcsYUFBYSxFQUFFLFVBQVUsR0FBRyxFQUFFO1FBQ2xELEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxxQkFBVSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvRCxDQUFDO0NBQ0Y7QUFKRCwwQ0FJQyJ9