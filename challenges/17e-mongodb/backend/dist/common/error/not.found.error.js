"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const http_status_1 = __importDefault(require("http-status"));
const base_error_1 = __importDefault(require("../error/base.error"));
class NotFoundError extends base_error_1.default {
    constructor(message = 'NOT_FOUND', methodName = '') {
        super('', message, methodName, http_status_1.default.NOT_FOUND, true);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90LmZvdW5kLmVycm9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tbW9uL2Vycm9yL25vdC5mb3VuZC5lcnJvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw4REFBcUM7QUFDckMscUVBQTRDO0FBRTVDLE1BQWEsYUFBYyxTQUFRLG9CQUFTO0lBQzFDLFlBQVksT0FBTyxHQUFHLFdBQVcsRUFBRSxVQUFVLEdBQUcsRUFBRTtRQUNoRCxLQUFLLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUscUJBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDN0QsQ0FBQztDQUNGO0FBSkQsc0NBSUMifQ==