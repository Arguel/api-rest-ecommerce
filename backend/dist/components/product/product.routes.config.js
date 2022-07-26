"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../../common/common.routes.config"));
const product_controller_1 = __importDefault(require("./controllers/product.controller"));
const product_middleware_1 = __importDefault(require("./middleware/product.middleware"));
class ProductsRoutes extends common_routes_config_1.default {
    constructor(app) {
        super(app, 'ProductsRoutes');
    }
    configureRoutes() {
        this.app.route(`/users`).get(product_controller_1.default.listProducts).post(product_middleware_1.default.validateRequiredProductBodyFields, 
        //ProductsMiddleware.validateSameEmailDoesntExist,
        product_controller_1.default.createProduct);
        this.app.param(`userId`, product_middleware_1.default.extractProductId);
        this.app
            .route(`/users/:userId`)
            .all(product_middleware_1.default.validateProductExists)
            .get(product_controller_1.default.getProductById)
            .delete(product_controller_1.default.removeProduct);
        this.app.put(`/users/:userId`, [
            product_middleware_1.default.validateRequiredProductBodyFields,
            //ProductsMiddleware.validateSameEmailBelongToSameProduct,
            product_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            //ProductsMiddleware.validatePatchEmail,
            product_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.default = ProductsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3Qucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSwwRkFBa0U7QUFDbEUseUZBQWlFO0FBR2pFLE1BQXFCLGNBQWUsU0FBUSw4QkFBa0I7SUFDNUQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLENBQUMsNEJBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUNoRSw0QkFBa0IsQ0FBQyxpQ0FBaUM7UUFDcEQsa0RBQWtEO1FBQ2xELDRCQUFrQixDQUFDLGFBQWEsQ0FDakMsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSw0QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzlELElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLGdCQUFnQixDQUFDO2FBQ3ZCLEdBQUcsQ0FBQyw0QkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQzthQUM3QyxHQUFHLENBQUMsNEJBQWtCLENBQUMsY0FBYyxDQUFDO2FBQ3RDLE1BQU0sQ0FBQyw0QkFBa0IsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUU1QyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRTtZQUM3Qiw0QkFBa0IsQ0FBQyxpQ0FBaUM7WUFDcEQsMERBQTBEO1lBQzFELDRCQUFrQixDQUFDLEdBQUc7U0FDdkIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDL0Isd0NBQXdDO1lBQ3hDLDRCQUFrQixDQUFDLEtBQUs7U0FDekIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQS9CRCxpQ0ErQkMifQ==