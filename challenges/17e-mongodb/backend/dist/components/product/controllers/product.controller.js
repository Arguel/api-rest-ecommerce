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
const log = (0, debug_1.default)('app:products-controller');
class ProductsController {
    listProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield product_service_1.default.list(100, 0);
            res.status(http_status_1.default.OK).send(products);
        });
    }
    getProductById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield product_service_1.default.readById(req.params.productId);
            res.status(http_status_1.default.OK).send(product);
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const productId = yield product_service_1.default.create(req.body);
            res.status(http_status_1.default.CREATED).send({ id: productId });
        });
    }
    patch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield product_service_1.default.patchById(req.params.productId, req.body));
            res.status(http_status_1.default.NO_CONTENT).send();
        });
    }
    removeProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            log(yield product_service_1.default.deleteById(req.params.productId));
            res.status(http_status_1.default.NO_CONTENT).send();
        });
    }
}
exports.default = new ProductsController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L2NvbnRyb2xsZXJzL3Byb2R1Y3QuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLGtGQUEwRDtBQUMxRCxrREFBMEI7QUFDMUIsOERBQXFDO0FBRXJDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRTlELE1BQU0sa0JBQWtCO0lBQ1QsWUFBWSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ25FLE1BQU0sUUFBUSxHQUFHLE1BQU0seUJBQWUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3BELEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBRVksY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQ3JFLE1BQU0sT0FBTyxHQUFHLE1BQU0seUJBQWUsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNyRSxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFDLENBQUM7S0FBQTtJQUVZLGFBQWEsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUNwRSxNQUFNLFNBQVMsR0FBRyxNQUFNLHlCQUFlLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6RCxHQUFHLENBQUMsTUFBTSxDQUFDLHFCQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7UUFDekQsQ0FBQztLQUFBO0lBRVksS0FBSyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzVELEdBQUcsQ0FBQyxNQUFNLHlCQUFlLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3JFLEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxDQUFDO0tBQUE7SUFFWSxhQUFhLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDcEUsR0FBRyxDQUFDLE1BQU0seUJBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQzVELEdBQUcsQ0FBQyxNQUFNLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUMzQyxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksa0JBQWtCLEVBQUUsQ0FBQyJ9