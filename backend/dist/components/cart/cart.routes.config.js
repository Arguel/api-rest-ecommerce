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
        this.app.route(`/cart`).get(cart_controller_1.default.listCarts).post(cart_middleware_1.default.validateRequiredCartBodyFields, 
        //CartMiddleware.validateSameEmailDoesntExist,
        cart_controller_1.default.createCart);
        //this.app.param(`cartId`, CartMiddleware.extractCartId);
        //this.app
        //  .route(`/cart/:cartId`)
        //  .all(CartMiddleware.validateCartExists)
        //  .get(CartController.getCartById)
        //  .delete(CartController.removeCart);
        //this.app.put(`/cart/:cartId`, [
        //  CartMiddleware.validateRequiredCartBodyFields,
        //  //CartMiddleware.validateSameEmailBelongToSameCart,
        //  CartController.put,
        //]);
        //this.app.patch(`/cart/:cartId`, [
        //  //CartMiddleware.validatePatchEmail,
        //  CartController.patch,
        //]);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L2NhcnQucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSxvRkFBMkQ7QUFDM0QsbUZBQTBEO0FBRzFELE1BQXFCLFVBQVcsU0FBUSw4QkFBa0I7SUFDeEQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxDQUFDLHlCQUFjLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUN4RCx5QkFBYyxDQUFDLDhCQUE4QjtRQUM3Qyw4Q0FBOEM7UUFDOUMseUJBQWMsQ0FBQyxVQUFVLENBQzFCLENBQUM7UUFFRix5REFBeUQ7UUFDekQsVUFBVTtRQUNWLDJCQUEyQjtRQUMzQiwyQ0FBMkM7UUFDM0Msb0NBQW9DO1FBQ3BDLHVDQUF1QztRQUV2QyxpQ0FBaUM7UUFDakMsa0RBQWtEO1FBQ2xELHVEQUF1RDtRQUN2RCx1QkFBdUI7UUFDdkIsS0FBSztRQUVMLG1DQUFtQztRQUNuQyx3Q0FBd0M7UUFDeEMseUJBQXlCO1FBQ3pCLEtBQUs7UUFFTCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUseUJBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsR0FBRzthQUNMLEtBQUssQ0FBQyxlQUFlLENBQUM7YUFDdEIsR0FBRyxDQUFDLHlCQUFjLENBQUMsa0JBQWtCLENBQUM7YUFDdEMsTUFBTSxDQUFDLHlCQUFjLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFckMsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsd0JBQXdCLENBQUM7YUFDL0IsR0FBRyxDQUFDLHlCQUFjLENBQUMsa0JBQWtCLENBQUM7YUFDdEMsR0FBRyxDQUFDLENBQUMseUJBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO2FBQ3pDLElBQUksQ0FBQztZQUNKLHlCQUFjLENBQUMsOEJBQThCO1lBQzdDLHlCQUFjLENBQUMscUJBQXFCO1lBQ3BDLHlCQUFjLENBQUMsVUFBVTtTQUMxQixDQUFDLENBQUM7UUFFTCxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsRUFBRTtZQUNuRCx5QkFBYyxDQUFDLGtCQUFrQjtZQUNqQyx5QkFBYyxDQUFDLGlCQUFpQjtTQUNqQyxDQUFDLENBQUM7UUFFSCxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBcERELDZCQW9EQyJ9