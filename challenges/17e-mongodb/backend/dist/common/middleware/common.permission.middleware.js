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
const log = (0, debug_1.default)('app:common-permission-middleware');
class CommonPermissionMiddleware {
    minimumEPermissionLevelRequired(requiredEPermissionLevel) {
        return (req, res, next) => {
            try {
                const userEPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
                if (userEPermissionLevel & requiredEPermissionLevel) {
                    next();
                }
                else {
                    res.status(403).send();
                }
            }
            catch (e) {
                log(e);
            }
        };
    }
    onlySameUserOrAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
            if (req.params &&
                req.params.userId &&
                req.params.userId === res.locals.jwt.userId) {
                return next();
            }
            else {
                if (userEPermissionLevel & common_permissionlevel_enum_1.EPermissionLevel.ADMIN_PERMISSION) {
                    return next();
                }
                else {
                    return res.status(403).send();
                }
            }
        });
    }
    onlyAdminCanDoThisAction(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const userEPermissionLevel = parseInt(res.locals.jwt.permissionLevel);
            if (userEPermissionLevel & common_permissionlevel_enum_1.EPermissionLevel.ADMIN_PERMISSION) {
                return next();
            }
            else {
                return res.status(403).send();
            }
        });
    }
}
exports.default = new CommonPermissionMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLnBlcm1pc3Npb24ubWlkZGxld2FyZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL2NvbW1vbi9taWRkbGV3YXJlL2NvbW1vbi5wZXJtaXNzaW9uLm1pZGRsZXdhcmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxzRkFBc0U7QUFDdEUsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRXZFLE1BQU0sMEJBQTBCO0lBQzlCLCtCQUErQixDQUFDLHdCQUEwQztRQUN4RSxPQUFPLENBQ0wsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEIsRUFDMUIsRUFBRTtZQUNGLElBQUk7Z0JBQ0YsTUFBTSxvQkFBb0IsR0FBRyxRQUFRLENBQ25DLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FDL0IsQ0FBQztnQkFDRixJQUFJLG9CQUFvQixHQUFHLHdCQUF3QixFQUFFO29CQUNuRCxJQUFJLEVBQUUsQ0FBQztpQkFDUjtxQkFBTTtvQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2lCQUN4QjthQUNGO1lBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ1I7UUFDSCxDQUFDLENBQUM7SUFDSixDQUFDO0lBRUssa0NBQWtDLENBQ3RDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUN0RSxJQUNFLEdBQUcsQ0FBQyxNQUFNO2dCQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTTtnQkFDakIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUMzQztnQkFDQSxPQUFPLElBQUksRUFBRSxDQUFDO2FBQ2Y7aUJBQU07Z0JBQ0wsSUFBSSxvQkFBb0IsR0FBRyw4Q0FBZ0IsQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDNUQsT0FBTyxJQUFJLEVBQUUsQ0FBQztpQkFDZjtxQkFBTTtvQkFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7aUJBQy9CO2FBQ0Y7UUFDSCxDQUFDO0tBQUE7SUFFSyx3QkFBd0IsQ0FDNUIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLE1BQU0sb0JBQW9CLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3RFLElBQUksb0JBQW9CLEdBQUcsOENBQWdCLENBQUMsZ0JBQWdCLEVBQUU7Z0JBQzVELE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDZjtpQkFBTTtnQkFDTCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDL0I7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksMEJBQTBCLEVBQUUsQ0FBQyJ9