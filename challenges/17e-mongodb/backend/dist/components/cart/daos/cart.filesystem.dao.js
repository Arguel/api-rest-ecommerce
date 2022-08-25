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
    create(cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                cart.id = (0, nanoid_1.nanoid)();
                cart.timestamp = new Date().toUTCString();
                yield this.crud.set(cart);
                return cart.id;
            }
            catch (err) {
                throw new base_error_1.default('Failed to save cart', err, 'create');
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
                throw new base_error_1.default('Failed to save cart', err, 'addProduct');
            }
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.crud.get();
            }
            catch (err) {
                throw new base_error_1.default('Carts could not be loaded', err, 'list');
            }
        });
    }
    readById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.crud.search('id', cartId);
            }
            catch (err) {
                throw new base_error_1.default('Could not get the cart', err, 'readById');
            }
        });
    }
    patchById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return 'Not implemented';
            }
            catch (err) {
                throw new base_error_1.default('Could not patch the cart', err, 'patchById');
            }
        });
    }
    deleteById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.crud.remove({ id: cartId });
                return `${cartId} removed`;
            }
            catch (err) {
                throw new base_error_1.default('Failed to remove cart', err, 'deleteById');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2FydC9kYW9zL2NhcnQuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBRTFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUM3QyxrRkFBeUQ7QUFJekQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxRQUFRO0lBSVo7UUFIaUIsYUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDBCQUEwQixDQUFDLENBQUM7UUFDNUQsU0FBSSxHQUFHLElBQUEsaUJBQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFHN0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVPLElBQUk7UUFDVixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLEdBQUcsQ0FBQyxzQ0FBc0MsQ0FBQyxDQUFDO1NBQzdDO0lBQ0gsQ0FBQztJQUVZLE1BQU0sQ0FBQyxJQUFvQjs7WUFDdEMsSUFBSTtnQkFDRixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUEsZUFBTSxHQUFFLENBQUM7Z0JBQ25CLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDMUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMs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