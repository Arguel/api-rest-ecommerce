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
const product_factory_dao_1 = __importDefault(require("../daos/product.factory.dao"));
class ProductsService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield product_factory_dao_1.default).create(resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // return ProductsDao.removeProductById(id);
            return ``;
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield product_factory_dao_1.default).list();
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            // return ProductsDao.patchProductById(id, resource);
        });
    }
    putById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            // return ProductsDao.putProductById(id, resource);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // return ProductsDao.getProductById(id);
            return ``;
        });
    }
}
exports.default = new ProductsService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9wcm9kdWN0L3NlcnZpY2VzL3Byb2R1Y3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUtBLHNGQUEwRDtBQUUxRCxNQUFNLGVBQWU7SUFDYixNQUFNLENBQUMsUUFBMkI7O1lBQ3RDLE9BQU8sQ0FBQyxNQUFNLDZCQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEVBQVU7O1lBQ3pCLDRDQUE0QztZQUM1QyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxLQUFjLEVBQUUsSUFBYTs7WUFDdEMsT0FBTyxDQUFDLE1BQU0sNkJBQWUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxFQUFVLEVBQUUsUUFBMEI7O1lBQ3BELHFEQUFxRDtRQUN2RCxDQUFDO0tBQUE7SUFFSyxPQUFPLENBQUMsRUFBVSxFQUFFLFFBQXdCOztZQUNoRCxtREFBbUQ7UUFDckQsQ0FBQztLQUFBO0lBRUssUUFBUSxDQUFDLEVBQVU7O1lBQ3ZCLHlDQUF5QztZQUN6QyxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxlQUFlLEVBQUUsQ0FBQyJ9