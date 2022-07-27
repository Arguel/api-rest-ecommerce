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
        this.products = [];
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
            yield this.crud.update({ id: productId }, product);
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
            //const newValues: IPatchProductDto = {};
            //allowedPatchFields.forEach((field) => {
            //if (field in product) {
            //@ts-ignore
            //newValues[field] = product[field];
            //}
            //});
            //this.crud.update({ id: productId }, { ...product, ...newValues });
            this.crud.update({ id: productId }, product, allowedPatchFields);
            return `${product.id} patched`;
        });
    }
    removeProductById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            const objIndex = this.products.findIndex((obj) => obj.id === productId);
            this.products.splice(objIndex, 1);
            return `${productId} removed`;
        });
    }
}
exports.default = new ProductsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC9kYW9zL3Byb2R1Y3QuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBSTFCLG1DQUFnQztBQUNoQyxnREFBd0I7QUFDeEIsbUJBQW1CO0FBQ25CLGdEQUE2QztBQUU3QyxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUV6RCxNQUFNLFdBQVc7SUFLZjtRQUpRLGFBQVEsR0FBNkIsRUFBRSxDQUFDO1FBQ3hDLGFBQVEsR0FBRyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2QkFBNkIsQ0FBQyxDQUFDO1FBQy9ELFNBQUksR0FBRyxJQUFBLGlCQUFPLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2pDLFlBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNwQyxHQUFHLENBQUMseUNBQXlDLENBQUMsQ0FBQztTQUNoRDtJQUNILENBQUM7SUFFSyxVQUFVLENBQUMsT0FBMEI7O1lBQ3pDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsSUFBQSxlQUFNLEdBQUUsQ0FBQztZQUN0QixNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdCLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFSyxXQUFXOztZQUNmLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxTQUFpQjs7WUFDcEMsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsU0FBaUIsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsa0JBQWtCLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxPQUF5Qjs7WUFDakUsTUFBTSxrQkFBa0IsR0FBRztnQkFDekIsTUFBTTtnQkFDTixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxPQUFPO2dCQUNQLE9BQU87YUFDQyxDQUFDO1lBQ1gseUNBQXlDO1lBQ3pDLHlDQUF5QztZQUN6Qyx5QkFBeUI7WUFDekIsWUFBWTtZQUNaLG9DQUFvQztZQUNwQyxHQUFHO1lBQ0gsS0FBSztZQUNMLG9FQUFvRTtZQUVwRSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztZQUNqRSxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsVUFBVSxDQUFDO1FBQ2pDLENBQUM7S0FBQTtJQUVLLGlCQUFpQixDQUFDLFNBQWlCOztZQUN2QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDdEMsQ0FBQyxHQUFtQixFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FDOUMsQ0FBQztZQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNsQyxPQUFPLEdBQUcsU0FBUyxVQUFVLENBQUM7UUFDaEMsQ0FBQztLQUFBO0NBQ0Y7QUFFRCxrQkFBZSxJQUFJLFdBQVcsRUFBRSxDQUFDIn0=