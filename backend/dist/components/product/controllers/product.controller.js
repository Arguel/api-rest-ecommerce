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
const log = (0, debug_1.default)('app:products-controller');
class ProductsController {
    listProducts(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('soy yo1');
                const products = yield product_service_1.default.list(100, 0);
                res.status(200).send(products);
            }
            catch (err) {
                const message = err instanceof api_error_1.APIError ? err.message : `Generic error for products`;
                res.status((err === null || err === void 0 ? void 0 : err.httpCode) || 500).send(message);
                next(err);
            }
        });
    }
    getProductById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('soy yo3');
                const product = yield product_service_1.default.readById(req.body.id);
                res.status(200).send(product);
            }
            catch (err) {
                const message = err instanceof api_error_1.APIError ? err.message : `Generic error for products`;
                res.status((err === null || err === void 0 ? void 0 : err.httpCode) || 500).send(message);
                next(err);
            }
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = yield product_service_1.default.create(req.body);
            res.status(201).send({ id: productId });
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield product_service_1.default.patchById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    put(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield product_service_1.default.putById(req.body.id, req.body));
            res.status(204).send();
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield product_service_1.default.deleteById(req.body.id));
            res.status(204).send();
        });
    }
}
exports.default = new ProductsController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L2NvbnRyb2xsZXJzL3Byb2R1Y3QuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtGQUEwRDtBQUMxRCxrREFBMEI7QUFDMUIsK0RBQTJEO0FBRzNELE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBQzlELE1BQU0sa0JBQWtCO0lBQ2hCLFlBQVksQ0FDaEIsR0FBb0IsRUFDcEIsR0FBcUIsRUFDckIsSUFBMEI7O1lBRTFCLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDdkIsTUFBTSxRQUFRLEdBQUcsTUFBTSx5QkFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2hDO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxPQUFPLEdBQ1gsR0FBRyxZQUFZLG9CQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDO2dCQUN2RSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQVksR0FBSSxhQUFKLEdBQUcsdUJBQUgsR0FBRyxDQUFHLFFBQVEsS0FBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUNsQixHQUFvQixFQUNwQixHQUFxQixFQUNyQixJQUEwQjs7WUFFMUIsSUFBSTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUN2QixNQUFNLE9BQU8sR0FBRyxNQUFNLHlCQUFlLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQzVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQy9CO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxPQUFPLEdBQ1gsR0FBRyxZQUFZLG9CQUFRLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLDRCQUE0QixDQUFDO2dCQUN2RSxHQUFHLENBQUMsTUFBTSxDQUFDLENBQVksR0FBSSxhQUFKLEdBQUcsdUJBQUgsR0FBRyxDQUFHLFFBQVEsS0FBSSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzVELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNYO1FBQ0gsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzdELE1BQU0sU0FBUyxHQUFHLE1BQU0seUJBQWUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDMUMsQ0FBQztLQUFBO0lBRUssS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3JELEdBQUcsQ0FBQyxNQUFNLHlCQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssR0FBRyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ25ELEdBQUcsQ0FBQyxNQUFNLHlCQUFlLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzFELEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDekIsQ0FBQztLQUFBO0lBRUssYUFBYSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzdELEdBQUcsQ0FBQyxNQUFNLHlCQUFlLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3pCLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxrQkFBa0IsRUFBRSxDQUFDIn0=