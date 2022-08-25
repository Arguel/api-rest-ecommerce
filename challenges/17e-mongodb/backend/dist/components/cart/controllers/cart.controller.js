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
const cart_service_1 = __importDefault(require("../services/cart.service"));
const debug_1 = __importDefault(require("debug"));
const http_status_1 = __importDefault(require("http-status"));
const log = (0, debug_1.default)('app:carts-controller');
class CartsController {
    listCarts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const carts = yield cart_service_1.default.list(100, 0);
                res.status(http_status_1.default.OK).send(carts);
            }
            catch (err) {
                next(err);
            }
        });
    }
    getCartProductsById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.readById(req.body.id);
                res.status(http_status_1.default.OK).send(cart.products);
            }
            catch (err) {
                next(err);
            }
        });
    }
    createCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartId = yield cart_service_1.default.create(req.body);
                res.status(http_status_1.default.CREATED).send({ id: cartId });
            }
            catch (err) {
                next(err);
            }
        });
    }
    addProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cartId = yield cart_service_1.default.addProduct(req.body.product, req.body.cart);
                res.status(http_status_1.default.CREATED).send({ id: cartId });
            }
            catch (err) {
                next(err);
            }
        });
    }
    removeCart(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                log(yield cart_service_1.default.deleteById(req.body.id));
                res.status(http_status_1.default.NO_CONTENT).send();
            }
            catch (err) {
                next(err);
            }
        });
    }
    removeCartProduct(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                log(yield cart_service_1.default.deleteProductById(req.body.product, req.body.cart));
                res.status(http_status_1.default.NO_CONTENT).send();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new CartsController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L2NvbnRyb2xsZXJzL2NhcnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDRFQUFvRDtBQUNwRCxrREFBMEI7QUFDMUIsOERBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQUNOLFNBQVMsQ0FDcEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsTUFBTSxLQUFLLEdBQUcsTUFBTSxzQkFBWSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdkM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDWDtRQUNILENBQUM7S0FBQTtJQUVZLG1CQUFtQixDQUM5QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLHNCQUFZLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQy9DO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1g7UUFDSCxDQUFDO0tBQUE7SUFFWSxVQUFVLENBQ3JCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQVksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7YUFDckQ7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDWDtRQUNILENBQUM7S0FBQTtJQUVZLFVBQVUsQ0FDckIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBWSxDQUFDLFVBQVUsQ0FDMUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQ2hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUNkLENBQUM7Z0JBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3JEO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1g7UUFDSCxDQUFDO0tBQUE7SUFFWSxVQUFVLENBQ3JCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUFJO2dCQUNGLEdBQUcsQ0FBQyxNQUFNLHNCQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQzFDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1g7UUFDSCxDQUFDO0tBQUE7SUFFWSxpQkFBaUIsQ0FDNUIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsR0FBRyxDQUNELE1BQU0sc0JBQVksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN0RSxDQUFDO2dCQUNGLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUMxQztZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGVBQWUsRUFBRSxDQUFDIn0=