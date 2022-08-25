"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_routes_config_1 = __importDefault(require("../../common/common.routes.config"));
const product_controller_1 = __importDefault(require("./controllers/product.controller"));
const product_middleware_1 = __importDefault(require("./middleware/product.middleware"));
const common_permission_middleware_1 = __importDefault(require("../../common/middleware/common.permission.middleware"));
class ProductsRoutes extends common_routes_config_1.default {
    constructor(app) {
        super(app, 'ProductsRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/products`)
            .get(product_controller_1.default.listProducts)
            .post(product_middleware_1.default.validateRequiredProductBodyFields, common_permission_middleware_1.default.isAdmin, product_controller_1.default.createProduct);
        this.app.param(`productId`, product_middleware_1.default.extractProductId);
        this.app
            .route(`/products/:productId`)
            .all(product_middleware_1.default.validateProductExists)
            .get(product_controller_1.default.getProductById)
            .all(common_permission_middleware_1.default.isAdmin)
            .delete(product_controller_1.default.removeProduct);
        this.app.patch(`/products/:productId`, [product_controller_1.default.patch]);
        return this.app;
    }
}
exports.default = ProductsRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5yb3V0ZXMuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L3Byb2R1Y3Qucm91dGVzLmNvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLDZGQUFtRTtBQUNuRSwwRkFBa0U7QUFDbEUseUZBQWlFO0FBRWpFLHdIQUF3RjtBQUV4RixNQUFxQixjQUFlLFNBQVEsOEJBQWtCO0lBQzVELFlBQVksR0FBd0I7UUFDbEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFDRCxlQUFlO1FBQ2IsSUFBSSxDQUFDLEdBQUc7YUFDTCxLQUFLLENBQUMsV0FBVyxDQUFDO2FBQ2xCLEdBQUcsQ0FBQyw0QkFBa0IsQ0FBQyxZQUFZLENBQUM7YUFDcEMsSUFBSSxDQUNILDRCQUFrQixDQUFDLGlDQUFpQyxFQUNwRCxzQ0FBb0IsQ0FBQyxPQUFPLEVBQzVCLDRCQUFrQixDQUFDLGFBQWEsQ0FDakMsQ0FBQztRQUVKLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSw0QkFBa0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxHQUFHO2FBQ0wsS0FBSyxDQUFDLHNCQUFzQixDQUFDO2FBQzdCLEdBQUcsQ0FBQyw0QkFBa0IsQ0FBQyxxQkFBcUIsQ0FBQzthQUM3QyxHQUFHLENBQUMsNEJBQWtCLENBQUMsY0FBYyxDQUFDO2FBQ3RDLEdBQUcsQ0FBQyxzQ0FBb0IsQ0FBQyxPQUFPLENBQUM7YUFDakMsTUFBTSxDQUFDLDRCQUFrQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLHNCQUFzQixFQUFFLENBQUMsNEJBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUVuRSxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7SUFDbEIsQ0FBQztDQUNGO0FBMUJELGlDQTBCQyJ9