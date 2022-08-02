"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../../common/common.routes.config"));
const cart_controller_1 = __importDefault(require("./controllers/cart.controller"));
const cart_middleware_1 = __importDefault(require("./middleware/cart.middleware"));
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
            .get([cart_controller_1.default.getCartProductsById])
            .post([
            cart_middleware_1.default.validateRequiredCartBodyFields,
            cart_middleware_1.default.validateProductExists,
            cart_controller_1.default.addProduct,
        ]);
        this.app.delete(`/cart/:cartId/products/:productId`, [
            cart_middleware_1.default.validateCartExists,
            cart_controller_1.default.removeCartProduct,
        ]);
        return this.app;
    }
}
exports.default = CartRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L2NhcnQucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSxvRkFBMkQ7QUFDM0QsbUZBQTBEO0FBRzFELE1BQXFCLFVBQVcsU0FBUSw4QkFBa0I7SUFDeEQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQ2QsR0FBRyxDQUFDLHlCQUFjLENBQUMsU0FBUyxDQUFDO2FBQzdCLElBQUksQ0FDSCx5QkFBYyxDQUFDLDhCQUE4QixFQUM3Qyx5QkFBYyxDQUFDLFVBQVUsQ0FDMUIsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSx5QkFBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLGVBQWUsQ0FBQzthQUN0QixHQUFHLENBQUMseUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQzthQUN0QyxNQUFNLENBQUMseUJBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVyQyxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQzthQUMvQixHQUFHLENBQUMseUJBQWMsQ0FBQyxrQkFBa0IsQ0FBQzthQUN0QyxHQUFHLENBQUMsQ0FBQyx5QkFBYyxDQUFDLG1CQUFtQixDQUFDLENBQUM7YUFDekMsSUFBSSxDQUFDO1lBQ0oseUJBQWMsQ0FBQyw4QkFBOEI7WUFDN0MseUJBQWMsQ0FBQyxxQkFBcUI7WUFDcEMseUJBQWMsQ0FBQyxVQUFVO1NBQzFCLENBQUMsQ0FBQztRQUVMLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLG1DQUFtQyxFQUFFO1lBQ25ELHlCQUFjLENBQUMsa0JBQWtCO1lBQ2pDLHlCQUFjLENBQUMsaUJBQWlCO1NBQ2pDLENBQUMsQ0FBQztRQUVILE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUFwQ0QsNkJBb0NDIn0=