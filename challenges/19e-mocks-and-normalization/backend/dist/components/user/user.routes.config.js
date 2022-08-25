"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../../common/common.routes.config"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const user_middleware_1 = __importDefault(require("./middleware/user.middleware"));
const jwt_middleware_1 = __importDefault(require("../../services/auth/middleware/jwt.middleware"));
const body_validation_middleware_1 = __importDefault(require("../../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
class UsersRoutes extends common_routes_config_1.default {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(jwt_middleware_1.default.validJWTNeeded, 
        // PermissionMiddleware.onlyAdminCanDoThisAction,
        user_controller_1.default.listUsers)
            .post(user_middleware_1.default.validateRequiredUserBodyFields, user_middleware_1.default.validateSameEmailDoesntExist, user_controller_1.default.createUser);
        this.app.param(`userId`, user_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(user_middleware_1.default.validateUserExists, jwt_middleware_1.default.validJWTNeeded
        // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction
        )
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
            // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
            // PermissionMiddleware.minimumEPermissionLevelRequired(
            // EPermissionLevel.PAID_PERMISSION
            // ),
            user_controller_1.default.patch,
        ]);
        this.app.put(`/users/:userId/permissionLevel/:permissionLevel`, [
            jwt_middleware_1.default.validJWTNeeded,
            // PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
            // PermissionMiddleware.minimumEPermissionLevelRequired(
            // EPermissionLevel.ADMIN_PERMISSION
            // ),
            user_controller_1.default.updatePermissionLevel,
        ]);
        return this.app;
    }
}
exports.default = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy91c2VyL3VzZXIucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSxvRkFBNEQ7QUFDNUQsbUZBQTJEO0FBQzNELG1HQUEwRTtBQUcxRSxvSEFBMEY7QUFDMUYseURBQXlDO0FBSXpDLE1BQXFCLFdBQVksU0FBUSw4QkFBa0I7SUFDekQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQ2YsR0FBRyxDQUNGLHdCQUFhLENBQUMsY0FBYztRQUM1QixpREFBaUQ7UUFDakQseUJBQWUsQ0FBQyxTQUFTLENBQzFCO2FBQ0EsSUFBSSxDQUNILHlCQUFlLENBQUMsOEJBQThCLEVBQzlDLHlCQUFlLENBQUMsNEJBQTRCLEVBQzVDLHlCQUFlLENBQUMsVUFBVSxDQUMzQixDQUFDO1FBRUosSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLHlCQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUNGLHlCQUFlLENBQUMsa0JBQWtCLEVBQ2xDLHdCQUFhLENBQUMsY0FBYztRQUM1QiwwREFBMEQ7U0FDM0Q7YUFDQSxHQUFHLENBQUMseUJBQWUsQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLHlCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0Isd0JBQWEsQ0FBQyxjQUFjO1lBQzVCLElBQUEsd0JBQUksRUFBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDbEMsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQztpQkFDYixRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ3BCLFdBQVcsQ0FBQyxnQ0FBZ0MsQ0FBQztpQkFDN0MsUUFBUSxFQUFFO1lBQ2IsSUFBQSx3QkFBSSxFQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN2QyxJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3RDLElBQUEsd0JBQUksRUFBQyxpQkFBaUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUMxQyxvQ0FBd0IsQ0FBQyxzQkFBc0I7WUFDL0MseUJBQWUsQ0FBQyxrQkFBa0I7WUFDbEMsMkRBQTJEO1lBQzNELHdEQUF3RDtZQUN4RCxtQ0FBbUM7WUFDbkMsS0FBSztZQUNMLHlCQUFlLENBQUMsS0FBSztTQUN0QixDQUFDLENBQUM7UUFFSCxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxpREFBaUQsRUFBRTtZQUM5RCx3QkFBYSxDQUFDLGNBQWM7WUFDNUIsMkRBQTJEO1lBQzNELHdEQUF3RDtZQUN4RCxvQ0FBb0M7WUFDcEMsS0FBSztZQUNMLHlCQUFlLENBQUMscUJBQXFCO1NBQ3RDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUE1REQsOEJBNERDIn0=