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
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const base_error_1 = __importDefault(require("../../../common/error/base.error"));
const bad_request_error_1 = require("../../../common/error/bad.request.error");
const product_model_1 = require("../models/product.model");
const log = (0, debug_1.default)('app:products-dao');
class ProductsDao {
    constructor() {
        log('Created new instance of ProductsDao');
    }
    create(productFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const product = new product_model_1.Product(productFields);
                yield product.save();
                return product.id;
            }
            catch (err) {
                if (err instanceof mongoose_1.default.Error.ValidationError) {
                    const message = Object.values(err.errors).map((prop) => prop.message);
                    throw new bad_request_error_1.BadRequestError(message.join('. '), 'create');
                }
                throw new base_error_1.default('Failed to save product', err, 'create');
            }
        });
    }
    deleteById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return product_model_1.Product.deleteOne({ _id: productId }).exec();
            }
            catch (err) {
                throw new base_error_1.default('Failed to remove product', err, 'deleteById');
            }
        });
    }
    readById(productId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return product_model_1.Product.findOne({ _id: productId }).exec();
            }
            catch (err) {
                throw new base_error_1.default('Failed to find product', err, 'readById');
            }
        });
    }
    list(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return product_model_1.Product.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    patchById(productId, productFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingProduct = yield product_model_1.Product.findOneAndUpdate({ _id: productId }, { $set: productFields }, { new: true }).exec();
                return existingProduct;
            }
            catch (err) {
                if (err instanceof mongoose_1.default.Error.ValidationError) {
                    const message = Object.values(err.errors).map((prop) => prop.message);
                    throw new bad_request_error_1.BadRequestError(message.join('. '), 'patchById');
                }
                throw new base_error_1.default('Failed to update product', err, 'patchById');
            }
        });
    }
}
exports.default = new ProductsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5tb25nb29zZS5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL3Byb2R1Y3QvZGFvcy9wcm9kdWN0Lm1vbmdvb3NlLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHdEQUFnQztBQUNoQyxrREFBMEI7QUFHMUIsa0ZBQXlEO0FBRXpELCtFQUEwRTtBQUMxRSwyREFBa0Q7QUFFbEQsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLGtCQUFrQixDQUFDLENBQUM7QUFFdkQsTUFBTSxXQUFXO0lBQ2Y7UUFDRSxHQUFHLENBQUMscUNBQXFDLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRVksTUFBTSxDQUFDLGFBQWdDOztZQUNsRCxJQUFJO2dCQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksdUJBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0MsTUFBTSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JCLE9BQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQzthQUNuQjtZQUFDLE9BQU8sR0FBRyxFQUFFO2dCQUNaLElBQUksR0FBRyxZQUFZLGtCQUFRLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRTtvQkFDakQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3RFLE1BQU0sSUFBSSxtQ0FBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ3pEO2dCQUNELE1BQU0sSUFBSSxvQkFBUyxDQUFDLHdCQUF3QixFQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUM5RDtRQUNILENBQUM7S0FBQTtJQUVZLFVBQVUsQ0FBQyxTQUFpQjs7WUFDdkMsSUFBSTtnQkFDRixPQUFPLHVCQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7YUFDckQ7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixNQUFNLElBQUksb0JBQVMsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUUsWUFBWSxDQUFDLENBQUM7YUFDcEU7UUFDSCxDQUFDO0tBQUE7SUFFWSxRQUFRLENBQUMsU0FBaUI7O1lBQ3JDLElBQUk7Z0JBQ0YsT0FBTyx1QkFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ25EO1lBQUMsT0FBTyxHQUFHLEVBQUU7Z0JBQ1osTUFBTSxJQUFJLG9CQUFTLENBQUMsd0JBQXdCLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUFDO2FBQ2hFO1FBQ0gsQ0FBQztLQUFBO0lBRVksSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLEVBQUUsSUFBSSxHQUFHLENBQUM7O1lBQ3BDLE9BQU8sdUJBQU8sQ0FBQyxJQUFJLEVBQUU7aUJBQ2xCLEtBQUssQ0FBQyxLQUFLLENBQUM7aUJBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7aUJBQ2xCLElBQUksRUFBRSxDQUFDO1FBQ1osQ0FBQztLQUFBO0lBRVksU0FBUyxDQUFDLFNBQWlCLEVBQUUsYUFBK0I7O1lBQ3ZFLElBQUk7Z0JBQ0YsTUFBTSxlQUFlLEdBQUcsTUFBTSx1QkFBTyxDQUFDLGdCQUFnQixDQUNwRCxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFDbEIsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLEVBQ3ZCLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNkLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBRVQsT0FBTyxlQUFlLENBQUM7YUFDeEI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLEdBQUcsWUFBWSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQ2pELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN0RSxNQUFNLElBQUksbUNBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2lCQUM1RDtnQkFDRCxNQUFNLElBQUksb0JBQVMsQ0FBQywwQkFBMEIsRUFBRSxHQUFHLEVBQUUsV0FBVyxDQUFDLENBQUM7YUFDbkU7UUFDSCxDQUFDO0tBQUE7Q0FDRjtBQUVELGtCQUFlLElBQUksV0FBVyxFQUFFLENBQUMifQ==