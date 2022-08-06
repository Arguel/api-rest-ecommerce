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
const common_permissionlevel_enum_1 = require("../types/common.permissionlevel.enum");
const debug_1 = __importDefault(require("debug"));
const http_status_1 = __importDefault(require("http-status"));
const log = (0, debug_1.default)('app:common-permission-middleware');
class CommonPermissionMiddleware {
    isAdmin(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userPermissionLevel = 8;
            if (userPermissionLevel & common_permissionlevel_enum_1.EPermissionLevel.ADMIN_PERMISSION) {
                return next();
            }
            else {
                return res
                    .status(http_status_1.default.FORBIDDEN)
                    .send('Insufficient permissions, request rejected');
            }
        });
    }
}
exports.default = new CommonPermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzRkFBd0U7QUFDeEUsa0RBQTBCO0FBQzFCLDhEQUFxQztBQUVyQyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsa0NBQWtDLENBQUMsQ0FBQztBQUV2RSxNQUFNLDBCQUEwQjtJQUN4QixPQUFPLENBQ1gsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO1lBQzlCLElBQUksbUJBQW1CLEdBQUcsOENBQWdCLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzNELE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLEdBQUc7cUJBQ1AsTUFBTSxDQUFDLHFCQUFVLENBQUMsU0FBUyxDQUFDO3FCQUM1QixJQUFJLENBQUMsNENBQTRDLENBQUMsQ0FBQzthQUN2RDtRQUNILENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSwwQkFBMEIsRUFBRSxDQUFDIn0=