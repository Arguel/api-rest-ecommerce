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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L2NvbnRyb2xsZXJzL2NhcnQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDRFQUFvRDtBQUNwRCxrREFBMEI7QUFDMUIsOERBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxzQkFBc0IsQ0FBQyxDQUFDO0FBRTNELE1BQU0sZUFBZTtJQUNOLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNoRSxNQUFNLEtBQUssR0FBRyxNQUFNLHNCQUFZLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUVZLG1CQUFtQixDQUM5QixHQUFvQixFQUNwQixHQUFxQjs7WUFFckIsTUFBTSxJQUFJLEdBQUcsTUFBTSxzQkFBWSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3RELEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVZLFVBQVUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNqRSxNQUFNLE1BQU0sR0FBRyxNQUFNLHNCQUFZLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBRVksVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ2pFLE1BQU0sTUFBTSxHQUFHLE1BQU0sc0JBQVksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUMzRSxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDdEQsQ0FBQztLQUFBO0lBRVksVUFBVSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ2pFLEdBQUcsQ0FBQyxNQUFNLHNCQUFZLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBRVksaUJBQWlCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDeEUsR0FBRyxDQUNELE1BQU0sc0JBQVksQ0FBQyxpQkFBaUIsQ0FDbEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQ2pCLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUNyQixDQUNGLENBQUM7WUFDRixHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDM0MsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLGVBQWUsRUFBRSxDQUFDIn0=