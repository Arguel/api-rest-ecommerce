"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status_code_enum_1 = require("../types/status.code.enum");
class BaseError extends Error {
    constructor(log, message = log, methodName, httpCode = status_code_enum_1.HttpStatusCodeEnum.INTERNAL_SERVER, isOperational = true) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5lcnJvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9lcnJvci9iYXNlLmVycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0VBQStEO0FBRS9ELE1BQXFCLFNBQVUsU0FBUSxLQUFLO0lBTTFDLFlBQ0UsR0FBVyxFQUNYLFVBQTRCLEdBQUcsRUFDL0IsVUFBbUIsRUFDbkIsUUFBUSxHQUFHLHFDQUFrQixDQUFDLGVBQWUsRUFDN0MsYUFBYSxHQUFHLElBQUk7UUFFcEIsS0FBSyxDQUFTLE9BQU8sQ0FBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbEQsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLFVBQVU7WUFBRSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLGFBQWEsQ0FBQztRQUVuQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztDQUNGO0FBdkJELDRCQXVCQyJ9