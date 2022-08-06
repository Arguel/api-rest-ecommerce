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
const fs_1 = __importDefault(require("fs"));
const debug_1 = __importDefault(require("debug"));
const nanoid_1 = require("nanoid");
const path_1 = __importDefault(require("path"));
// @ts-expect-error
const localdb_1 = require("@abmsourav/localdb");
const base_error_1 = __importDefault(require("../../../common/error/base.error"));
const log = (0, debug_1.default)('app:filesystem-dao');
class CartsDao {
    constructor() {
        this.filename = path_1.default.join(__dirname, 'carts.filesystem.db.json');
        this.crud = (0, localdb_1.localDB)(this.filename);
        this.init();
        log('Created new instance of CartsDao');
    }
    init() {
        if (!fs_1.default.existsSync(this.filename)) {
            fs_1.default.writeFileSync(this.filename, '');
            log('Database not found, created carts.db');
        }
    }
    addCart(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                cart.id = (0, nanoid_1.nanoid)();
                cart.timestamp = new Date().toUTCString();
                yield this.crud.set(cart);
                return cart.id;
            }
            catch (err) {
                throw new base_error_1.default('Failed to save cart', err, 'addCart');
            }
        });
    }
    addProduct(cartId, products) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.crud.search('id', cartId);
                const allowedPutFields = ['products'];
                const newProducts = cart.products.concat(products);
                yield this.crud.update({ id: cartId }, { products: newProducts }, allowedPutFields);
                return `${cart.id} updated`;
            }
            catch (err) {
                throw new base_error_1.default('Failed to save cart', err, 'addCart');
            }
        });
    }
    getCarts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.crud.get();
            }
            catch (err) {
                throw new base_error_1.default('Carts could not be loaded', err, 'getCarts');
            }
        });
    }
    getCartById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.crud.search('id', cartId);
            }
            catch (err) {
                throw new base_error_1.default('Could not get the cart', err, 'getCartById');
            }
        });
    }
    removeCartById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.crud.remove({ id: cartId });
                return `${cartId} removed`;
            }
            catch (err) {
                throw new base_error_1.default('Failed to remove cart', err, 'removeCartById');
            }
        });
    }
    removeCartProductById(cartId, productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = yield this.crud.search('id', cartId);
                const allowedPutFields = ['products'];
                const newProducts = cart.products.filter((product) => product.id !== productId);
                yield this.crud.update({ id: cartId }, { products: newProducts }, allowedPutFields);
                return `${cart.id} updated`;
            }
            catch (err) {
                throw new base_error_1.default('Failed to remove product', err, 'removeCartProductById');
            }
        });
    }
}
exports.default = new CartsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2FydC9kYW9zL2NhcnQuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBRTFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUM3QyxrRkFBeUQ7QUFHekQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxRQUFRO0lBSVo7UUFIaUIsYUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsU0FBSSxHQUFHLElBQUEsaUJBQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFHN0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVLLE9BQU8sQ0FBQyxJQUFvQjs7WUFDaEMsSUFBSTtnQkFDRixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUEsZUFBTSxHQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMs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