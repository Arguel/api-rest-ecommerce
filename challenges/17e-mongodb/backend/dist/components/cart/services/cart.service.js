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
const cart_filesystem_dao_1 = __importDefault(require("../daos/cart.filesystem.dao"));
const cart_factory_dao_1 = __importDefault(require("../daos/cart.factory.dao"));
class CartsService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).create(resource);
        });
    }
    addProduct(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.addProduct(id, resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).deleteById(id);
        });
    }
    deleteProductById(id, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.removeCartProductById(id, productId);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).list(limit, page);
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).readById(id);
        });
    }
    patchById(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).patchById(id, resource);
        });
    }
}
exports.default = new CartsService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L3NlcnZpY2VzL2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNGQUFtRDtBQUluRCxnRkFBdUQ7QUFHdkQsTUFBTSxZQUFZO0lBQ1YsTUFBTSxDQUFDLFFBQXdCOztZQUNuQyxPQUFPLENBQUMsTUFBTSwwQkFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2xELENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FDZCxFQUFVLEVBQ1YsUUFBa0M7O1lBRWxDLE9BQU8sNkJBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7S0FBQTtJQUVLLFVBQVUsQ0FBQyxFQUFVOztZQUN6QixPQUFPLENBQUMsTUFBTSwwQkFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hELENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLEVBQVUsRUFBRSxTQUFpQjs7WUFDbkQsT0FBTyw2QkFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN2RCxDQUFDO0tBQUE7SUFFSyxJQUFJLENBQUMsS0FBYyxFQUFFLElBQWE7O1lBQ3RDLE9BQU8sQ0FBQyxNQUFNLDBCQUFlLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25ELENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxFQUFVOztZQUN2QixPQUFPLENBQUMsTUFBTSwwQkFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzlDLENBQUM7S0FBQTtJQUVLLFNBQVMsQ0FBQyxFQUFVLEVBQUUsUUFBdUI7O1lBQ2pELE9BQU8sQ0FBQyxNQUFNLDBCQUFlLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3pELENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyJ9