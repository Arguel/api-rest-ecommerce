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
const product_service_1 = __importDefault(require("../../product/services/product.service"));
const log = (0, debug_1.default)('app:cart-controller');
class CartsMiddleware {
    validateRequiredCartBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body && req.body.products) {
                next();
            }
            else {
                res.status(http_status_1.default.BAD_REQUEST).send({
                    error: `Missing required fields {products}`,
                });
            }
        });
    }
    validateCartExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield cart_service_1.default.readById(req.params.cartId);
                if (cart) {
                    next();
                }
                else {
                    res
                        .status(http_status_1.default.NOT_FOUND)
                        .send({ error: `Cart ${req.params.userId} not found` });
                }
            }
            catch (err) {
                res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ error: `Cart ${req.params.cartId} not found` });
            }
        });
    }
    validateProductExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const values = yield Promise.all(req.body.products.map((productId) => __awaiter(this, void 0, void 0, function* () {
                    const product = yield product_service_1.default.readById(productId);
                    if (product)
                        return product;
                })));
                if (values) {
                    req.body.values = values;
                    next();
                }
                else {
                    res.status(http_status_1.default.NOT_FOUND).send({ error: `Products not found` });
                }
            }
            catch (err) {
                res.status(http_status_1.default.NOT_FOUND).send({ error: `Products not found` });
            }
        });
    }
    extractCartId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.cartId;
            next();
        });
    }
}
exports.default = new CartsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L21pZGRsZXdhcmUvY2FydC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNEVBQW1EO0FBQ25ELGtEQUEwQjtBQUMxQiw4REFBcUM7QUFDckMsNkZBQW9FO0FBR3BFLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxxQkFBcUIsQ0FBQyxDQUFDO0FBRTFELE1BQU0sZUFBZTtJQUNiLDhCQUE4QixDQUNsQyxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSSxHQUFHLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNqQyxJQUFJLEVBQUUsQ0FBQzthQUNSO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3RDLEtBQUssRUFBRSxvQ0FBb0M7aUJBQzVDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0lBRUssa0JBQWtCLENBQ3RCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUFJO2dCQUNGLE1BQU0sSUFBSSxHQUFHLE1BQU0sc0JBQVcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxJQUFJLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLENBQUM7aUJBQ1I7cUJBQU07b0JBQ0wsR0FBRzt5QkFDQSxNQUFNLENBQUMscUJBQVUsQ0FBQyxTQUFTLENBQUM7eUJBQzVCLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFZLEVBQUUsQ0FBQyxDQUFDO2lCQUMzRDthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osR0FBRztxQkFDQSxNQUFNLENBQUMscUJBQVUsQ0FBQyxTQUFTLENBQUM7cUJBQzVCLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFZLEVBQUUsQ0FBQyxDQUFDO2FBQzNEO1FBQ0gsQ0FBQztLQUFBO0lBRUsscUJBQXFCLENBQ3pCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUFJO2dCQUNGLE1BQU0sTUFBTSxHQUFvQixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQy9DLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFPLFNBQWlCLEVBQUUsRUFBRTtvQkFDaEQsTUFBTSxPQUFPLEdBQUcsTUFBTSx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDekQsSUFBSSxPQUFPO3dCQUFFLE9BQU8sT0FBTyxDQUFDO2dCQUM5QixDQUFDLENBQUEsQ0FBQyxDQUNILENBQUM7Z0JBQ0YsSUFBSSxNQUFNLEVBQUU7b0JBQ1YsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO29CQUN6QixJQUFJLEVBQUUsQ0FBQztpQkFDUjtxQkFBTTtvQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFLENBQUMsQ0FBQztpQkFDeEU7YUFDRjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO2FBQ3hFO1FBQ0gsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUNqQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==