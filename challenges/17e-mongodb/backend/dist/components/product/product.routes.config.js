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
        this.app.route(`/products`).get(product_controller_1.default.listProducts).post(product_middleware_1.default.validateRequiredProductBodyFields, 
        // PermissionMiddleware.isAdmin,
        product_controller_1.default.createProduct);
        this.app.param(`productId`, product_middleware_1.default.extractProductId);
        this.app
            .route(`/products/:productId`)
            .all(product_middleware_1.default.validateProductExists)
            .get(product_controller_1.default.getProductById)
            // .all(PermissionMiddleware.isAdmin)
            .delete(product_controller_1.default.removeProduct);
        this.app.patch(`/products/:productId`, [product_controller_1.default.patch]);
        return this.app;
    }
}
exports.default = ProductsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3Qucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSwwRkFBa0U7QUFDbEUseUZBQWlFO0FBSWpFLE1BQXFCLGNBQWUsU0FBUSw4QkFBa0I7SUFDNUQsWUFBWSxHQUF3QjtRQUNsQyxLQUFLLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7SUFDL0IsQ0FBQztJQUNELGVBQWU7UUFDYixJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsNEJBQWtCLENBQUMsWUFBWSxDQUFDLENBQUMsSUFBSSxDQUNuRSw0QkFBa0IsQ0FBQyxpQ0FBaUM7UUFDcEQsZ0NBQWdDO1FBQ2hDLDRCQUFrQixDQUFDLGFBQWEsQ0FDakMsQ0FBQztRQUVGLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSw0QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLHNCQUFzQixDQUFDO2FBQzdCLEdBQUcsQ0FBQyw0QkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQzthQUM3QyxHQUFHLENBQUMsNEJBQWtCLENBQUMsY0FBYyxDQUFDO1lBQ3ZDLHFDQUFxQzthQUNwQyxNQUFNLENBQUMsNEJBQWtCLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFNUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsQ0FBQyw0QkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBRW5FLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQztJQUNsQixDQUFDO0NBQ0Y7QUF2QkQsaUNBdUJDIn0=