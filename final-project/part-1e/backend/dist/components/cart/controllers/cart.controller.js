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
    listCarts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const carts = yield cart_service_1.default.list(100, 0);
            res.status(http_status_1.default.OK).send(carts);
        });
    }
    getCartProductsById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cart = yield cart_service_1.default.readById(req.body.id);
            res.status(http_status_1.default.OK).send(cart.products);
        });
    }
    createCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartId = yield cart_service_1.default.create(req.body);
            res.status(http_status_1.default.CREATED).send({ id: cartId });
        });
    }
    addProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const cartId = yield cart_service_1.default.addProduct(req.body.id, req.body.values);
            res.status(http_status_1.default.CREATED).send({ id: cartId });
        });
    }
    removeCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield cart_service_1.default.deleteById(req.body.id));
            res.status(http_status_1.default.NO_CONTENT).send();
        });
    }
    removeCartProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield cart_service_1.default.deleteProductById(req.params.cartId, req.params.productId));
            res.status(http_status_1.default.NO_CONTENT).send();
        });
    }
}
exports.default = new CartsController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L2NvbnRyb2xsZXJzL2NhcnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDRFQUFvRDtBQUNwRCxrREFBMEI7QUFDMUIsOERBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQUNiLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUN6RCxNQUFNLEtBQUssR0FBRyxNQUFNLHNCQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUVLLG1CQUFtQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ25FLE1BQU0sSUFBSSxHQUFHLE1BQU0sc0JBQVksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUN0RCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDMUQsTUFBTSxNQUFNLEdBQUcsTUFBTSxzQkFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUMxRCxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3RELENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUMxRCxHQUFHLENBQUMsTUFBTSxzQkFBWSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDaEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNDLENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ2pFLEdBQUcsQ0FDRCxNQUFNLHNCQUFZLENBQUMsaUJBQWlCLENBQ2xDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUNqQixHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FDckIsQ0FDRixDQUFDO1lBQ0YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNDLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9