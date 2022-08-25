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
const product_service_1 = __importDefault(require("../services/product.service"));
const http_status_1 = __importDefault(require("http-status"));
const mongoose_1 = require("mongoose");
const not_found_error_1 = require("../../../common/error/not.found.error");
const bad_request_error_1 = require("../../../common/error/bad.request.error");
class ProductsMiddleware {
    validateRequiredProductBodyFields(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.body &&
                req.body.timestamp &&
                req.body.name &&
                req.body.price &&
                req.body.stock) {
                next();
            }
            else {
                res.status(http_status_1.default.BAD_REQUEST).send({
                    error: `Missing required fields {timestamp, name, price, stock}`,
                });
            }
        });
    }
    validateProductExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.default.readById(req.params.productId);
                if (!product) {
                    throw new not_found_error_1.NotFoundError('Product not found', 'validateProductExists');
                }
                req.body.product = product;
                next();
            }
            catch (err) {
                if (err instanceof mongoose_1.Error.CastError) {
                    next(new bad_request_error_1.BadRequestError('Invalid product id', 'validateProductExists'));
                    return;
                }
                next(err);
            }
        });
    }
    extractProductId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            req.body.id = req.params.productId;
            next();
        });
    }
}
exports.default = new ProductsMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L21pZGRsZXdhcmUvcHJvZHVjdC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0ZBQXlEO0FBQ3pELDhEQUFxQztBQUNyQyx1Q0FBK0M7QUFDL0MsMkVBQXNFO0FBQ3RFLCtFQUEwRTtBQUUxRSxNQUFNLGtCQUFrQjtJQUNULGlDQUFpQyxDQUM1QyxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFDRSxHQUFHLENBQUMsSUFBSTtnQkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0JBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQ2Q7Z0JBQ0EsSUFBSSxFQUFFLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUN0QyxLQUFLLEVBQUUseURBQXlEO2lCQUNqRSxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FBQTtJQUVZLHFCQUFxQixDQUNoQyxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSTtnQkFDRixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ1osTUFBTSxJQUFJLCtCQUFhLENBQUMsbUJBQW1CLEVBQUUsdUJBQXVCLENBQUMsQ0FBQztpQkFDdkU7Z0JBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUMzQixJQUFJLEVBQUUsQ0FBQzthQUNSO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxHQUFHLFlBQVksZ0JBQVUsQ0FBQyxTQUFTLEVBQUU7b0JBQ3ZDLElBQUksQ0FDRixJQUFJLG1DQUFlLENBQUMsb0JBQW9CLEVBQUUsdUJBQXVCLENBQUMsQ0FDbkUsQ0FBQztvQkFDRixPQUFPO2lCQUNSO2dCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQztLQUFBO0lBRVksZ0JBQWdCLENBQzNCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIn0=