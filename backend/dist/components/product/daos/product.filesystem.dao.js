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
class ProductsDao {
    constructor() {
        this.filename = path_1.default.join(__dirname, 'products.filesystem.db.json');
        this.crud = (0, localdb_1.localDB)(this.filename);
        this.init();
        log('Created new instance of ProductsDao');
    }
    init() {
        if (!fs_1.default.existsSync(this.filename)) {
            fs_1.default.writeFileSync(this.filename, '');
            log('Database not found, created products.db');
        }
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                product.id = (0, nanoid_1.nanoid)();
                product.timestamp = new Date().toUTCString();
                yield this.crud.set(product);
                return product.id;
            }
            catch (err) {
                throw new base_error_1.default('Failed to save product', err, 'addProduct');
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.crud.get();
            }
            catch (err) {
                throw new base_error_1.default('Products could not be loaded', err, 'getProducts');
            }
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log('soy yo');
                return yield this.crud.search('id', productId);
            }
            catch (err) {
                throw new base_error_1.default('Could not get the product', err, 'getProductById');
            }
        });
    }
    putProductById(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allowedPutFields = [
                    'timestamp',
                    'name',
                    'description',
                    'productCode',
                    'thumbnailUrl',
                    'price',
                    'stock',
                ];
                yield this.crud.update({ id: productId }, product, allowedPutFields);
                return `${product.id} updated via put`;
            }
            catch (err) {
                throw new base_error_1.default('Failed to update product', err, 'putProductById');
            }
        });
    }
    patchProductById(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const allowedPatchFields = [
                    'name',
                    'description',
                    'productCode',
                    'thumbnailUrl',
                    'price',
                    'stock',
                ];
                yield this.crud.update({ id: productId }, product, allowedPatchFields);
                return `${product.id} patched`;
            }
            catch (err) {
                throw new base_error_1.default('Failed to update product', err, 'patchProductById');
            }
        });
    }
    removeProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.crud.remove({ id: productId });
                return `${productId} removed`;
            }
            catch (err) {
                throw new base_error_1.default('Failed to remove product', err, 'removeProductById');
            }
        });
    }
}
exports.default = new ProductsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC9kYW9zL3Byb2R1Y3QuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBSTFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUM3QyxrRkFBeUQ7QUFFekQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxXQUFXO0lBT2Y7UUFOaUIsYUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQ25DLFNBQVMsRUFDVCw2QkFBNkIsQ0FDOUIsQ0FBQztRQUNlLFNBQUksR0FBRyxJQUFBLGlCQUFPLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pDLFlBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFSyxVQUFVLENBQUMsT0FBMEI7O1lBQ3pDLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFBLGVBQU0sR0FBRSxDQUFDO2dCQUN0QixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMs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