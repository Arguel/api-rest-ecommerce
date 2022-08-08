"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
class BaseError extends Error {
    constructor(log, message = log, methodName, httpCode = http_status_1.default.INTERNAL_SERVER_ERROR, isOperational = true) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);
        this.log = log;
        if (methodName)
            this.methodName = methodName;
        this.httpCode = httpCode;
        this.isOperational = isOperational;
        Error.captureStackTrace(this);
    }
}
exports.default = BaseError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9lcnJvci9iYXNlLmVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOERBQXFDO0FBRXJDLE1BQXFCLFNBQVUsU0FBUSxLQUFLO0lBTTFDLFlBQ0UsR0FBVyxFQUNYLFVBQTRCLEdBQUcsRUFDL0IsVUFBbUIsRUFDbkIsUUFBUSxHQUFHLHFCQUFVLENBQUMscUJBQXFCLEVBQzNDLGFBQWEsR0FBRyxJQUFJO1FBRXBCLEtBQUssQ0FBUyxPQUFPLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRWxELElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxVQUFVO1lBQUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUM7UUFFbkMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2hDLENBQUM7Q0FDRjtBQXZCRCw0QkF1QkMifQ==