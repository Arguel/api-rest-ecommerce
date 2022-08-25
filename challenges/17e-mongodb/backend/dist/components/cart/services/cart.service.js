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
const cart_factory_dao_1 = __importDefault(require("../daos/cart.factory.dao"));
class CartsService {
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).create(resource);
        });
    }
    addProduct(product, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).addProduct(product, cart);
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).deleteById(id);
        });
    }
    deleteProductById(product, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield cart_factory_dao_1.default).deleteProductById(product, cart);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vY29tcG9uZW50cy9jYXJ0L3NlcnZpY2VzL2NhcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUdBLGdGQUF1RDtBQUd2RCxNQUFNLFlBQVk7SUFDVixNQUFNLENBQUMsUUFBd0I7O1lBQ25DLE9BQU8sQ0FBQyxNQUFNLDBCQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUNkLE9BQTBCLEVBQzFCLElBQW9COztZQUVwQixPQUFPLENBQUMsTUFBTSwwQkFBZSxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzRCxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsRUFBVTs7WUFDekIsT0FBTyxDQUFDLE1BQU0sMEJBQWUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNoRCxDQUFDO0tBQUE7SUFFSyxpQkFBaUIsQ0FDckIsT0FBMEIsRUFDMUIsSUFBb0I7O1lBRXBCLE9BQU8sQ0FBQyxNQUFNLDBCQUFlLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEUsQ0FBQztLQUFBO0lBRUssSUFBSSxDQUFDLEtBQWMsRUFBRSxJQUFhOztZQUN0QyxPQUFPLENBQUMsTUFBTSwwQkFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO0tBQUE7SUFFSyxRQUFRLENBQUMsRUFBVTs7WUFDdkIsT0FBTyxDQUFDLE1BQU0sMEJBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxDQUFDO0tBQUE7SUFFSyxTQUFTLENBQUMsRUFBVSxFQUFFLFFBQXVCOztZQUNqRCxPQUFPLENBQUMsTUFBTSwwQkFBZSxDQUFDLENBQUMsU0FBUyxDQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksWUFBWSxFQUFFLENBQUMifQ==