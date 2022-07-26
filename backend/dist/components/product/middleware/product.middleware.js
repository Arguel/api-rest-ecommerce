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
            const product = yield product_service_1.default.readById(req.params.productId);
            if (product) {
                next();
            }
            else {
                res.status(404).send({
                    error: `Product ${req.params.productId} not found`,
                });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L21pZGRsZXdhcmUvcHJvZHVjdC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0ZBQXlEO0FBQ3pELGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUU3RCxNQUFNLGtCQUFrQjtJQUNoQixpQ0FBaUMsQ0FDckMsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQ0UsR0FBRyxDQUFDLElBQUk7Z0JBQ1IsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTO2dCQUNsQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7Z0JBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO2dCQUNkLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUNkO2dCQUNBLElBQUksRUFBRSxDQUFDO2FBQ1I7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ25CLEtBQUssRUFBRSx5REFBeUQ7aUJBQ2pFLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0lBRUsscUJBQXFCLENBQ3pCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFjLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDcEUsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxFQUFFLENBQUM7YUFDUjtpQkFBTTtnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDbkIsS0FBSyxFQUFFLFdBQVcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLFlBQVk7aUJBQ25ELENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQ3BCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIn0=