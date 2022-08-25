"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../../common/common.routes.config"));
const cart_controller_1 = __importDefault(require("./controllers/cart.controller"));
const cart_middleware_1 = __importDefault(require("./middleware/cart.middleware"));
const product_middleware_1 = __importDefault(require("../product/middleware/product.middleware"));
class CartRoutes extends common_routes_config_1.default {
    constructor(app) {
        super(app, 'CartRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/cart`)
            .get(cart_controller_1.default.listCarts)
            .post(cart_middleware_1.default.validateRequiredCartBodyFields, cart_controller_1.default.createCart);
        this.app.param(`cartId`, cart_middleware_1.default.extractCartId);
        this.app
            .route(`/cart/:cartId`)
            .all(cart_middleware_1.default.validateCartExists)
            .delete(cart_controller_1.default.removeCart);
        this.app
            .route(`/cart/:cartId/products`)
            .all(cart_middleware_1.default.validateCartExists)
            .get([cart_controller_1.default.getCartProductsById]);
        this.app
            .route(`/cart/:cartId/products/:productId`)
            .all(cart_middleware_1.default.validateCartExists, product_middleware_1.default.validateProductExists)
            .post([cart_controller_1.default.addProduct])
            .delete([cart_controller_1.default.removeCartProduct]);
        return this.app;
    }
}
exports.default = CartRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L2NhcnQucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSxvRkFBMkQ7QUFDM0QsbUZBQTBEO0FBQzFELGtHQUF5RTtBQUd6RSxNQUFxQixVQUFXLFNBQVEsOEJBQWtCO0lBQ3hELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsZUFBZTtRQUNiLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLE9BQU8sQ0FBQzthQUNkLEdBQUcsQ0FBQyx5QkFBYyxDQUFDLFNBQVMsQ0FBQzthQUM3QixJQUFJLENBQ0gseUJBQWMsQ0FBQyw4QkFBOEIsRUFDN0MseUJBQWMsQ0FBQyxVQUFVLENBQzFCLENBQUM7UUFFSixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUseUJBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxlQUFlLENBQUM7YUFDdEIsR0FBRyxDQUFDLHlCQUFjLENBQUMsa0JBQWtCLENBQUM7YUFDdEMsTUFBTSxDQUFDLHlCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsd0JBQXdCLENBQUM7YUFDL0IsR0FBRyxDQUFDLHlCQUFjLENBQUMsa0JBQWtCLENBQUM7YUFDdEMsR0FBRyxDQUFDLENBQUMseUJBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7UUFFN0MsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsbUNBQW1DLENBQUM7YUFDMUMsR0FBRyxDQUNGLHlCQUFjLENBQUMsa0JBQWtCLEVBQ2pDLDRCQUFpQixDQUFDLHFCQUFxQixDQUN4QzthQUNBLElBQUksQ0FBQyxDQUFDLHlCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDakMsTUFBTSxDQUFDLENBQUMseUJBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7UUFFOUMsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ2xCLENBQUM7Q0FDRjtBQW5DRCw2QkFtQ0MifQ==