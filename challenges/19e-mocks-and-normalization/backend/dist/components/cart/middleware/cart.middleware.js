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
const mongoose_1 = require("mongoose");
const not_found_error_1 = require("../../../common/error/not.found.error");
const bad_request_error_1 = require("../../../common/error/bad.request.error");
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
                if (!cart) {
                    throw new not_found_error_1.NotFoundError('Cart not found', 'validateCartExists');
                }
                req.body.cart = cart;
                next();
            }
            catch (err) {
                if (err instanceof mongoose_1.Error.CastError) {
                    next(new bad_request_error_1.BadRequestError('Invalid cart id', 'validateCartExists'));
                    return;
                }
                next(err);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L21pZGRsZXdhcmUvY2FydC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNEVBQW1EO0FBQ25ELDhEQUFxQztBQUNyQyx1Q0FBK0M7QUFDL0MsMkVBQXNFO0FBQ3RFLCtFQUEwRTtBQUcxRSxNQUFNLGVBQWU7SUFDTiw4QkFBOEIsQ0FDekMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakMsSUFBSSxFQUFFLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUN0QyxLQUFLLEVBQUUsb0NBQW9DO2lCQUM1QyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtJQUVZLGtCQUFrQixDQUM3QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBbUIsTUFBTSxzQkFBVyxDQUFDLFFBQVEsQ0FDckQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ2xCLENBQUM7Z0JBQ0YsSUFBSSxDQUFDLElBQUksRUFBRTtvQkFDVCxNQUFNLElBQUksK0JBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO2lCQUNqRTtnQkFDRCxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQ3JCLElBQUksRUFBRSxDQUFDO2FBQ1I7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLEdBQUcsWUFBWSxnQkFBVSxDQUFDLFNBQVMsRUFBRTtvQkFDdkMsSUFBSSxDQUFDLElBQUksbUNBQWUsQ0FBQyxpQkFBaUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM7b0JBQ25FLE9BQU87aUJBQ1I7Z0JBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ1g7UUFDSCxDQUFDO0tBQUE7SUFFWSxhQUFhLENBQ3hCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUNoQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9