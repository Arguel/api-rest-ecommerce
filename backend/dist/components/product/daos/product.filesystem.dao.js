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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC9kYW9zL3Byb2R1Y3QuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBSTFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUU3QyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV6RCxNQUFNLFdBQVc7SUFJZjtRQUhRLGFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBQy9ELFNBQUksR0FBRyxJQUFBLGlCQUFPLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pDLFlBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFSyxVQUFVLENBQUMsT0FBMEI7O1lBQ3pDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBQSxlQUFNLEdBQUUsQ0FBQztZQUN0QixPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDN0MsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3QixPQUFPLE9BQU8sQ0FBQyxFQUFFLENBQUM7UUFDcEIsQ0FBQztLQUFBO0lBRUssV0FBVzs7WUFDZixPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUMvQixDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsU0FBaUI7O1lBQ3BDLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDakQsQ0FBQztLQUFBO0lBRUssY0FBYyxDQUFDLFNBQWlCLEVBQUUsT0FBdUI7O1lBQzdELE1BQU0sZ0JBQWdCLEdBQUc7Z0JBQ3ZCLFdBQVc7Z0JBQ1gsTUFBTTtnQkFDTixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxPQUFPO2dCQUNQLE9BQU87YUFDQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztZQUNyRSxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsa0JBQWtCLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxPQUF5Qjs7WUFDakUsTUFBTSxrQkFBa0IsR0FBRztnQkFDekIsTUFBTTtnQkFDTixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxPQUFPO2dCQUNQLE9BQU87YUFDQyxDQUFDO1lBQ1gsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUN2RSxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLFNBQWlCOztZQUN2QyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFDMUMsT0FBTyxHQUFHLFNBQVMsVUFBVSxDQUFDO1FBQ2hDLENBQUM7S0FBQTtDQUNGO0FBRUQsa0JBQWUsSUFBSSxXQUFXLEVBQUUsQ0FBQyJ9