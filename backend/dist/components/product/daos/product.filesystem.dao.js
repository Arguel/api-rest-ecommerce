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
// @ts-expect-error
const localdb_1 = require("@abmsourav/localdb");
const log = (0, debug_1.default)('app:filesystem-dao');
class ProductsDao {
    constructor() {
        this.products = [];
        this.filename = './products.filesystem.db.json';
        this.crud = (0, localdb_1.localDB)(this.filename);
        this.init();
        log('Created new instance of ProductsDao');
    }
    init() {
        try {
            fs_1.default.readFileSync(this.filename);
        }
        catch (error) {
            fs_1.default.writeFileSync(this.filename, '');
            log('Database not found, created products.db');
        }
    }
    addProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            product.id = (0, nanoid_1.nanoid)();
            this.products.push(product);
            this.products = yield this.crud.set(product);
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
            const newValues = {};
            allowedPatchFields.forEach((field) => {
                if (field in product) {
                    // @ts-ignore
                    newValues[field] = product[field];
                }
            });
            this.crud.update({ id: productId }, Object.assign(Object.assign({}, product), newValues));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5maWxlc3lzdGVtLmRhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC9kYW9zL3Byb2R1Y3QuZmlsZXN5c3RlbS5kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSw0Q0FBb0I7QUFDcEIsa0RBQTBCO0FBSTFCLG1DQUFnQztBQUNoQyxtQkFBbUI7QUFDbkIsZ0RBQTZDO0FBRTdDLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQyxvQkFBb0IsQ0FBQyxDQUFDO0FBRXpELE1BQU0sV0FBVztJQUtmO1FBSlEsYUFBUSxHQUE2QixFQUFFLENBQUM7UUFDeEMsYUFBUSxHQUFHLCtCQUErQixDQUFDO1FBQzNDLFNBQUksR0FBRyxJQUFBLGlCQUFPLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUNaLEdBQUcsQ0FBQyxxQ0FBcUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSTtZQUNGLFlBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ2hDO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDZCxZQUFFLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDcEMsR0FBRyxDQUFDLHlDQUF5QyxDQUFDLENBQUM7U0FDaEQ7SUFDSCxDQUFDO0lBRUssVUFBVSxDQUFDLE9BQTBCOztZQUN6QyxPQUFPLENBQUMsRUFBRSxHQUFHLElBQUEsZUFBTSxHQUFFLENBQUM7WUFDdEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdDLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQztRQUNwQixDQUFDO0tBQUE7SUFFSyxXQUFXOztZQUNmLE9BQU8sTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1FBQy9CLENBQUM7S0FBQTtJQUVLLGNBQWMsQ0FBQyxTQUFpQjs7WUFDcEMsT0FBTyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNqRCxDQUFDO0tBQUE7SUFFSyxjQUFjLENBQUMsU0FBaUIsRUFBRSxPQUF1Qjs7WUFDN0QsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUNuRCxPQUFPLEdBQUcsT0FBTyxDQUFDLEVBQUUsa0JBQWtCLENBQUM7UUFDekMsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsU0FBaUIsRUFBRSxPQUF5Qjs7WUFDakUsTUFBTSxrQkFBa0IsR0FBRztnQkFDekIsTUFBTTtnQkFDTixhQUFhO2dCQUNiLGFBQWE7Z0JBQ2IsY0FBYztnQkFDZCxPQUFPO2dCQUNQLE9BQU87YUFDQyxDQUFDO1lBQ1gsTUFBTSxTQUFTLEdBQXFCLEVBQUUsQ0FBQztZQUN2QyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxLQUFLLElBQUksT0FBTyxFQUFFO29CQUNwQixhQUFhO29CQUNiLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ25DO1lBQ0gsQ0FBQyxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsa0NBQU8sT0FBTyxHQUFLLFNBQVMsRUFBRyxDQUFDO1lBQ2xFLE9BQU8sR0FBRyxPQUFPLENBQUMsRUFBRSxVQUFVLENBQUM7UUFDakMsQ0FBQztLQUFBO0lBRUssaUJBQWlCLENBQUMsU0FBaUI7O1lBQ3ZDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUN0QyxDQUFDLEdBQW1CLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssU0FBUyxDQUM5QyxDQUFDO1lBQ0YsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sR0FBRyxTQUFTLFVBQVUsQ0FBQztRQUNoQyxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksV0FBVyxFQUFFLENBQUMifQ==