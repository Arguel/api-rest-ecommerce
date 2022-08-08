"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const base_error_1 = __importDefault(require("../error/base.error"));
class APIError extends base_error_1.default {
    constructor(message, methodName = '', httpCode = http_status_1.default.INTERNAL_SERVER_ERROR, isOperational = true) {
        super('', message, methodName, httpCode, isOperational);
    }
}
exports.APIError = APIError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL2Vycm9yL2FwaS5lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4REFBcUM7QUFDckMscUVBQTRDO0FBRTVDLE1BQWEsUUFBUyxTQUFRLG9CQUFTO0lBQ3JDLFlBQ0UsT0FBZSxFQUNmLFVBQVUsR0FBRyxFQUFFLEVBQ2YsUUFBUSxHQUFHLHFCQUFVLENBQUMscUJBQXFCLEVBQzNDLGFBQWEsR0FBRyxJQUFJO1FBRXBCLEtBQUssQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDMUQsQ0FBQztDQUNGO0FBVEQsNEJBU0MifQ==