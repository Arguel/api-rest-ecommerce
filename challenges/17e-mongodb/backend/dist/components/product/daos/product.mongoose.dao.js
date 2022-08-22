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
const mongoose_service_1 = __importDefault(require("../../../services/mongoose.service"));
const nanoid_1 = require("nanoid");
const debug_1 = __importDefault(require("debug"));
const base_error_1 = __importDefault(require("../../../common/error/base.error"));
const bad_request_error_1 = require("../../../common/error/bad.request.error");
const log = (0, debug_1.default)('app:products-dao');
class ProductsDao {
    constructor() {
        this.mongoose = mongoose_service_1.default.getMongoose();
        this.productSchema = new this.mongoose.Schema({
            _id: { type: String, required: true },
            timestamp: { type: String, required: true },
            name: { type: String, required: true },
            description: String,
            productCode: Number,
            thumbnailUrl: String,
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
        }, {
            timestamps: true,
            versionKey: false,
        });
        this.Product = mongoose_service_1.default.getMongoose().model('Product', this.productSchema);
        log('Created new instance of ProductsDao');
    }
    create(productFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productId = (0, nanoid_1.nanoid)();
                const product = new this.Product(Object.assign(Object.assign({}, productFields), { _id: productId }));
                yield product.save();
                return productId;
            }
            catch (err) {
                if (err instanceof this.mongoose.Error.ValidationError) {
                    const message = Object.values(err.errors).map((prop) => prop.message);
                    throw new bad_request_error_1.BadRequestError(message.join('. '), 'addProduct');
                }
                throw new base_error_1.default('Failed to save product', err, 'addProduct');
            }
        });
    }
    deleteById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.Product.deleteOne({ _id: productId }).exec();
            }
            catch (err) {
                throw new base_error_1.default('Failed to remove product', err, 'deleteById');
            }
        });
    }
    readById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return this.Product.findOne({ _id: productId })
                    .populate('Product')
                    .exec();
            }
            catch (err) {
                throw new base_error_1.default('Failed to find product', err, 'readById');
            }
        });
    }
    list(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.Product.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    patchById(productId, productFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield this.Product.findOneAndUpdate({ _id: productId }, { $set: productFields }, { new: true }).exec();
                return existingProduct;
            }
            catch (err) {
                if (err instanceof this.mongoose.Error.ValidationError) {
                    const message = Object.values(err.errors).map((prop) => prop.message);
                    throw new bad_request_error_1.BadRequestError(message.join('. '), 'updateById');
                }
                throw new base_error_1.default('Failed to update product', err, 'updateById');
            }
        });
    }
}
exports.default = new ProductsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5tb25nb29zZS5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL3Byb2R1Y3QvZGFvcy9wcm9kdWN0Lm1vbmdvb3NlLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLDBGQUFpRTtBQUNqRSxtQ0FBZ0M7QUFDaEMsa0RBQTBCO0FBRzFCLGtGQUF5RDtBQUV6RCwrRUFBMEU7QUFFMUUsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFdkQsTUFBTSxXQUFXO0lBc0JmO1FBckJBLGFBQVEsR0FBRywwQkFBZSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBRXpDLGtCQUFhLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FDdEM7WUFDRSxHQUFHLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDckMsU0FBUyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1lBQzNDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtZQUN0QyxXQUFXLEVBQUUsTUFBTTtZQUNuQixXQUFXLEVBQUUsTUFBTTtZQUNuQixZQUFZLEVBQUUsTUFBTTtZQUNwQixLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7WUFDdkMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO1NBQ3hDLEVBQ0Q7WUFDRSxVQUFVLEVBQUUsSUFBSTtZQUNoQixVQUFVLEVBQUUsS0FBSztTQUNsQixDQUNGLENBQUM7UUFFRixZQUFPLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsU0FBUyxF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