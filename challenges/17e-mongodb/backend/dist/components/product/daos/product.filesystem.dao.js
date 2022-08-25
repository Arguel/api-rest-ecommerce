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
    create(product) {
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
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.crud.get();
            }
            catch (err) {
                throw new base_error_1.default('Products could not be loaded', err, 'getProducts');
            }
        });
    }
    readById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.crud.search('id', productId);
            }
            catch (err) {
                throw new base_error_1.default('Could not get the product', err, 'getProductById');
            }
        });
    }
    patchById(productId, product) {
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
    deleteById(productId) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC9kYW9zL3Byb2R1Y3QuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBRzFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUM3QyxrRkFBeUQ7QUFHekQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLG9CQUFvQixDQUFDLENBQUM7QUFFekQsTUFBTSxXQUFXO0lBT2Y7UUFOaUIsYUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQ25DLFNBQVMsRUFDVCw2QkFBNkIsQ0FDOUIsQ0FBQztRQUNlLFNBQUksR0FBRyxJQUFBLGlCQUFPLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRzdDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTyxJQUFJO1FBQ1YsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pDLFlBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFWSxNQUFNLENBQUMsT0FBMEI7O1lBQzVDLElBQUk7Z0JBQ0YsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFBLGVBQU0sR0FBRSxDQUFDO2dCQUN0QixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQzdDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNuQjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxvQkFBUyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRSxZQUFZLENBQUMsQ0FBQzthQUNsRTtRQUNILENBQUM7S0FBQTtJQUVZLElBQUk7O1lBQ2YsSUFBSTtnQkFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUM5QjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxvQkFBUyxDQUFDLDhCQUE4QixFQUFFLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQzthQUN6RTtRQUNILENBQUM7S0FBQTtJQUVZLFFBQVEsQ0FBQyxTQUFpQjs7WUFDckMsSUFBSTtnQkFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2FBQ2hEO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxJQUFJLG9CQUFTLENBQUMsMkJBQTJCLEVBQUUsR0FBRyxFQUFFLGdCQUFnQixDQUFDLENBQUM7YUFDekU7UUFDSCxDQUFDO0tBQUE7SUFFWSxTQUFTLENBQUMsU0FBaUIsRUFBRSxPQUF5Qjs7WUFDakUsSUFBSTtnQkFDRixNQUFNLGtCQUFrQixHQUFHO29CQUN6QixNQUFNO29CQUNOLGFBQWE7b0JBQ2IsYUFBYTtvQkFDYixjQUFjO29CQUNkLE9BQU87b0JBQ1AsT0FBTztpQkFDQyxDQUFDO2dCQUNYLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsT0FBTyxFQUFFLGtCQUFrQixDQUFDLENBQUM7Z0JBQ3ZFLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLENBQUM7YUFDaEM7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLElBQUksb0JBQVMsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUUsa0JBQWtCLENBQUMsQ0FBQzthQUMxRTtRQUNILENBQUM7S0FBQTtJQUVZLFVBQVUsQ0FBQyxTQUFpQjs7WUFDdkMsSUFBSTtnQkFDRixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBQzthQUMvQjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLE1BQU0sSUFBSSxvQkFBUyxDQUFDLDBCQUEwQixFQUFFLEdBQUcsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2FBQzNFO1FBQ0gsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLFdBQVcsRUFBRSxDQUFDIn0=