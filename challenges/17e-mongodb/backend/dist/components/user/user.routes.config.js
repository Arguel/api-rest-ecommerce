"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../../common/common.routes.config"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const user_middleware_1 = __importDefault(require("./middleware/user.middleware"));
const jwt_middleware_1 = __importDefault(require("../../services/auth/middleware/jwt.middleware"));
const common_permission_middleware_1 = __importDefault(require("../../common/middleware/common.permission.middleware"));
const common_permissionlevel_enum_1 = require("../../common/types/common.permissionlevel.enum");
const body_validation_middleware_1 = __importDefault(require("../../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class UsersRoutes extends common_routes_config_1.default {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.onlyAdminCanDoThisAction, user_controller_1.default.listUsers)
            .post(user_middleware_1.default.validateRequiredUserBodyFields, user_middleware_1.default.validateSameEmailDoesntExist, user_controller_1.default.createUser);
        this.app.param(`userId`, user_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(user_middleware_1.default.validateUserExists, jwt_middleware_1.default.validJWTNeeded, common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction)
            .get(user_controller_1.default.getUserById)
            .delete(user_controller_1.default.removeUser);
        this.app.patch(`/users/:userId`, [
            jwt_middleware_1.default.validJWTNeeded,
            (0, express_validator_1.body)('email').isEmail().optional(),
            (0, express_validator_1.body)('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            (0, express_validator_1.body)('firstName').isString().optional(),
            (0, express_validator_1.body)('lastName').isString().optional(),
            (0, express_validator_1.body)('permissionLevel').isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            user_middleware_1.default.validatePatchEmail,
            common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction,
            common_permission_middleware_1.default.minimumEPermissionLevelRequired(common_permissionlevel_enum_1.EPermissionLevel.PAID_PERMISSION),
            user_controller_1.default.patch,
        ]);
        this.app.put(`/users/:userId/permissionLevel/:permissionLevel`, [
            jwt_middleware_1.default.validJWTNeeded,
            common_permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction,
            common_permission_middleware_1.default.minimumEPermissionLevelRequired(common_permissionlevel_enum_1.EPermissionLevel.ADMIN_PERMISSION),
            user_controller_1.default.updatePermissionLevel,
        ]);
        return this.app;
    }
}
exports.default = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy91c2VyL3VzZXIucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSxvRkFBNEQ7QUFDNUQsbUZBQTJEO0FBQzNELG1HQUEwRTtBQUMxRSx3SEFBd0Y7QUFDeEYsZ0dBQWtGO0FBQ2xGLG9IQUEwRjtBQUMxRix5REFBeUM7QUFJekMsTUFBcUIsV0FBWSxTQUFRLDhCQUFrQjtJQUN6RCxZQUFZLEdBQXdCO1FBQ2xDLEtBQUssQ0FBQyxHQUFHLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDNUIsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxRQUFRLENBQUM7YUFDZixHQUFHLENBQ0Ysd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLHdCQUF3QixFQUM3Qyx5QkFBZSxDQUFDLFNBQVMsQ0FDMUI7YUFDQSxJQUFJLENBQ0gseUJBQWUsQ0FBQyw4QkFBOEIsRUFDOUMseUJBQWUsQ0FBQyw0QkFBNEIsRUFDNUMseUJBQWUsQ0FBQyxVQUFVLENBQzNCLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUseUJBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQzthQUN2QixHQUFHLENBQ0YseUJBQWUsQ0FBQyxrQkFBa0IsRUFDbEMsd0JBQWEsQ0FBQyxjQUFjLEVBQzVCLHNDQUFvQixDQUFDLGtDQUFrQyxDQUN4RDthQUNBLEdBQUcsQ0FBQyx5QkFBZSxDQUFDLFdBQVcsQ0FBQzthQUNoQyxNQUFNLENBQUMseUJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRTtZQUMvQix3QkFBYSxDQUFDLGNBQWM7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUNsQyxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDO2lCQUNiLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDcEIsV0FBVyxDQUFDLGdDQUFnQyxDQUFDO2lCQUM3QyxRQUFRLEVBQUU7WUFDYixJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdEMsSUFBQSx3QkFBSSxFQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzFDLG9DQUF3QixDQUFDLHNCQUFzQjtZQUMvQyx5QkFBZSxDQUFDLGtCQUFrQjtZQUNsQyxzQ0FBb0IsQ0FBQyxrQ0FBa0M7WUFDdkQsc0NBQW9CLENBQUMsK0JBQStCLENBQ2xELDhDQUFnQixDQUFDLGVBQWUsQ0FDakM7WUFDRCx5QkFBZSxDQUFDLEtBQUs7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsaURBQWlELEVBQUU7WUFDOUQsd0JBQWEsQ0FBQyxjQUFjO1lBQzVCLHNDQUFvQixDQUFDLGtDQUFrQztZQUN2RCxzQ0FBb0IsQ0FBQywrQkFBK0IsQ0FDbEQsOENBQWdCLENBQUMsZ0JBQWdCLENBQ2xDO1lBQ0QseUJBQWUsQ0FBQyxxQkFBcUI7U0FDdEMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQTVERCw4QkE0REMifQ==