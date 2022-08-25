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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L21pZGRsZXdhcmUvY2FydC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsNEVBQW1EO0FBRW5ELDhEQUFxQztBQUNyQyx1Q0FBK0M7QUFFL0MsMkVBQXNFO0FBQ3RFLCtFQUEwRTtBQUcxRSxNQUFNLGVBQWU7SUFDTiw4QkFBOEIsQ0FDekMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDakMsSUFBSSxFQUFFLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUN0QyxLQUFLLEVBQUUsb0NBQW9DO2lCQUM1QyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtJQUVZLGtCQUFrQixDQUM3QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxNQUFNLHNCQUFXLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsTUFBTSxJQUFJLCtCQUFhLENBQUMsZ0JBQWdCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztpQkFDakU7Z0JBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixJQUFJLEVBQUUsQ0FBQzthQUNSO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxHQUFHLFlBQVksZ0JBQVUsQ0FBQyxTQUFTLEVBQUU7b0JBQ3ZDLElBQUksQ0FBQyxJQUFJLG1DQUFlLENBQUMsaUJBQWlCLEVBQUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO29CQUNuRSxPQUFPO2lCQUNSO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQztLQUFBO0lBRVksYUFBYSxDQUN4QixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDaEMsSUFBSSxFQUFFLENBQUM7UUFDVCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksZUFBZSxFQUFFLENBQUMifQ==