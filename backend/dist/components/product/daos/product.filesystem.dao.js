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
            product.id = (0, nanoid_1.nanoid)();
            product.timestamp = new Date().toUTCString();
            yield this.crud.set(product);
            return product.id;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crud.get();
        });
    }
    getProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.crud.search('id', productId);
        });
    }
    putProductById(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    patchProductById(productId, product) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    removeProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.crud.remove({ id: productId });
            return `${productId} removed`;
        });
    }
}
exports.default = new ProductsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC9kYW9zL3Byb2R1Y3QuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBSTFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUU3QyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV6RCxNQUFNLFdBQVc7SUFPZjtRQU5pQixhQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FDbkMsU0FBUyxFQUNULDZCQUE2QixDQUM5QixDQUFDO1FBQ2UsU0FBSSxHQUFHLElBQUEsaUJBQU8sRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFHN0MsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ1osR0FBRyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELElBQUk7UUFDRixJQUFJLENBQUMsWUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDakMsWUFBRSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3BDLEdBQUcsQ0FBQyx5Q0FBeUMsQ0FBQyxDQUFDO1NBQ2hEO0lBQ0gsQ0FBQztJQUVLLFVBQVUsQ0FBQyxPQUEwQjs7WUFDekMsT0FBTyxDQUFDLEVBQUUsR0FBRyxJQUFBLGVBQU0sR0FBRSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxTQUFTLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM3QyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFSyxXQUFXOztZQUNmLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxTQUFpQjs7WUFDcEMsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsU0FBaUIsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxnQkFBZ0IsR0FBRztnQkFDdkIsV0FBVztnQkFDWCxNQUFNO2dCQUNOLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixjQUFjO2dCQUNkLE9BQU87Z0JBQ1AsT0FBTzthQUNDLENBQUM7WUFDWCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3JFLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxrQkFBa0IsQ0FBQztRQUN6QyxDQUFDO0tBQUE7SUFFSyxnQkFBZ0IsQ0FBQyxTQUFpQixFQUFFLE9BQXlCOztZQUNqRSxNQUFNLGtCQUFrQixHQUFHO2dCQUN6QixNQUFNO2dCQUNOLGFBQWE7Z0JBQ2IsYUFBYTtnQkFDYixjQUFjO2dCQUNkLE9BQU87Z0JBQ1AsT0FBTzthQUNDLENBQUM7WUFDWCxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1lBQ3ZFLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDakMsQ0FBQztLQUFBO0lBRUssaUJBQWlCLENBQUMsU0FBaUI7O1lBQ3ZDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUMxQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUM7UUFDaEMsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLFdBQVcsRUFBRSxDQUFDIn0=