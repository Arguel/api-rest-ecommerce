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
const http_status_1 = __importDefault(require("http-status"));
const product_service_1 = __importDefault(require("../../product/services/product.service"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L21pZGRsZXdhcmUvY2FydC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNEVBQW1EO0FBQ25ELDhEQUFxQztBQUNyQyw2RkFBb0U7QUFHcEUsTUFBTSxlQUFlO0lBQ04sOEJBQThCLENBQ3pDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pDLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDdEMsS0FBSyxFQUFFLG9DQUFvQztpQkFDNUMsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO0tBQUE7SUFFWSxrQkFBa0IsQ0FDN0IsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxzQkFBVyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLElBQUksRUFBRTtvQkFDUixJQUFJLEVBQUUsQ0FBQztpQkFDUjtxQkFBTTtvQkFDTCxHQUFHO3lCQUNBLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFNBQVMsQ0FBQzt5QkFDNUIsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFDLENBQUM7aUJBQzNEO2FBQ0Y7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixHQUFHO3FCQUNBLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFNBQVMsQ0FBQztxQkFDNUIsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFFBQVEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLFlBQVksRUFBRSxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDO0tBQUE7SUFFWSxxQkFBcUIsQ0FDaEMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsTUFBTSxNQUFNLEdBQTZCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDeEQsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQU8sU0FBaUIsRUFBRSxFQUFFO29CQUNoRCxNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFjLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN6RCxJQUFJLE9BQU87d0JBQUUsT0FBTyxPQUFPLENBQUM7Z0JBQzlCLENBQUMsQ0FBQSxDQUFDLENBQ0gsQ0FBQztnQkFDRixJQUFJLE1BQU0sRUFBRTtvQkFDVixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7b0JBQ3pCLElBQUksRUFBRSxDQUFDO2lCQUNSO3FCQUFNO29CQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO2lCQUN4RTthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxxQkFBVSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7YUFDeEU7UUFDSCxDQUFDO0tBQUE7SUFFWSxhQUFhLENBQ3hCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9