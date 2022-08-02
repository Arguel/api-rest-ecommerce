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
const http_status_1 = __importDefault(require("http-status"));
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
                if (product) {
                    next();
                }
                else {
                    res
                        .status(http_status_1.default.NOT_FOUND)
                        .send({ error: `Product ${req.params.userId} not found` });
                }
            }
            catch (err) {
                res
                    .status(http_status_1.default.NOT_FOUND)
                    .send({ error: `Product ${req.params.productId} not found` });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5taWRkbGV3YXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L21pZGRsZXdhcmUvcHJvZHVjdC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0ZBQXlEO0FBQ3pELGtEQUEwQjtBQUMxQiw4REFBcUM7QUFFckMsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHdCQUF3QixDQUFDLENBQUM7QUFFN0QsTUFBTSxrQkFBa0I7SUFDaEIsaUNBQWlDLENBQ3JDLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUNFLEdBQUcsQ0FBQyxJQUFJO2dCQUNSLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUztnQkFDbEIsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSztnQkFDZCxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssRUFDZDtnQkFDQSxJQUFJLEVBQUUsQ0FBQzthQUNSO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQ3RDLEtBQUssRUFBRSx5REFBeUQ7aUJBQ2pFLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztLQUFBO0lBRUsscUJBQXFCLENBQ3pCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixJQUFJO2dCQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQWMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDcEUsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsSUFBSSxFQUFFLENBQUM7aUJBQ1I7cUJBQU07b0JBQ0wsR0FBRzt5QkFDQSxNQUFNLENBQUMscUJBQVUsQ0FBQyxTQUFTLENBQUM7eUJBQzVCLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxZQUFZLEVBQUUsQ0FBQyxDQUFDO2lCQUM5RDthQUNGO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osR0FBRztxQkFDQSxNQUFNLENBQUMscUJBQVUsQ0FBQyxTQUFTLENBQUM7cUJBQzVCLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxXQUFXLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2FBQ2pFO1FBQ0gsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQ3BCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUUxQixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxJQUFJLEVBQUUsQ0FBQztRQUNULENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIn0=