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
const debug_1 = __importDefault(require("debug"));
const api_error_1 = require("../../../common/error/api.error");
const status_code_enum_1 = require("../../../common/types/status.code.enum");
const log = (0, debug_1.default)('app:product-controller');
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
                res.status(400).send({
                    error: `Missing required fields {timestamp, name, price, stock}`,
                });
            }
        });
    }
    validateProductExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = yield product_service_1.default.readById(req.params.productId);
                if (product)
                    next();
            }
            catch (err) {
                const errMessage = `Product ${req.params.productId} not found`;
                res.status(status_code_enum_1.HttpStatusCodeEnum.NOT_FOUND).send({ error: errMessage });
                throw new api_error_1.APIError(errMessage, 'validateProductExists', status_code_enum_1.HttpStatusCodeEnum.NOT_FOUND);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L21pZGRsZXdhcmUvcHJvZHVjdC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0ZBQXlEO0FBQ3pELGtEQUEwQjtBQUMxQiwrREFBMkQ7QUFDM0QsNkVBQTRFO0FBRTVFLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRTdELE1BQU0sa0JBQWtCO0lBQ2hCLGlDQUFpQyxDQUNyQyxHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFDRSxHQUFHLENBQUMsSUFBSTtnQkFDUixHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVM7Z0JBQ2xCLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDYixHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7Z0JBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQ2Q7Z0JBQ0EsSUFBSSxFQUFFLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsS0FBSyxFQUFFLHlEQUF5RDtpQkFDakUsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO0tBQUE7SUFFSyxxQkFBcUIsQ0FDekIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSx5QkFBYyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRSxJQUFJLE9BQU87b0JBQUUsSUFBSSxFQUFFLENBQUM7YUFDckI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLFVBQVUsR0FBRyxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxZQUFZLENBQUM7Z0JBQy9ELEdBQUcsQ0FBQyxNQUFNLENBQUMscUNBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ3JFLE1BQU0sSUFBSSxvQkFBUSxDQUNoQixVQUFVLEVBQ1YsdUJBQXVCLEVBQ3ZCLHFDQUFrQixDQUFDLFNBQVMsQ0FDN0IsQ0FBQzthQUNIO1FBQ0gsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQ3BCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIn0=