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
class CartsService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.addCart(resource);
        });
    }
    addProduct(id, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.addProduct(id, resource);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.removeCartById(id);
        });
    }
    deleteProductById(id, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.removeCartProductById(id, productId);
        });
    }
    list(limit, page) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.getCarts();
        });
    }
    readById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_filesystem_dao_1.default.getCartById(id);
        });
    }
}
exports.default = new CartsService();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L3NlcnZpY2VzL2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNGQUFtRDtBQUtuRCxNQUFNLFlBQVk7SUFDVixNQUFNLENBQUMsUUFBd0I7O1lBQ25DLE9BQU8sNkJBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEVBQVUsRUFBRSxRQUF5Qjs7WUFDcEQsT0FBTyw2QkFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDM0MsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLEVBQVU7O1lBQ3pCLE9BQU8sNkJBQVEsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUssaUJBQWlCLENBQUMsRUFBVSxFQUFFLFNBQWlCOztZQUNuRCxPQUFPLDZCQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELENBQUM7S0FBQTtJQUVLLElBQUksQ0FBQyxLQUFjLEVBQUUsSUFBYTs7WUFDdEMsT0FBTyw2QkFBUSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzdCLENBQUM7S0FBQTtJQUVLLFFBQVEsQ0FBQyxFQUFVOztZQUN2QixPQUFPLDZCQUFRLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxZQUFZLEVBQUUsQ0FBQyJ9