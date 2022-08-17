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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2FydC9kYW9zL2NhcnQuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBRTFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUM3QyxrRkFBeUQ7QUFHekQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxRQUFRO0lBSVo7UUFIaUIsYUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsU0FBSSxHQUFHLElBQUEsaUJBQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFHN0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLElBQUk7UUFDVixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVZLE9BQU8sQ0FBQyxJQUFvQjs7WUFDdkMsSUFBSTtnQkFDRixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUEsZUFBTSxHQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMs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