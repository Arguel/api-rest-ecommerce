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
exports.CartsDao = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const debug_1 = __importDefault(require("debug"));
const base_error_1 = __importDefault(require("../../../common/error/base.error"));
const bad_request_error_1 = require("../../../common/error/bad.request.error");
const cart_model_1 = require("../models/cart.model");
const not_found_error_1 = require("../../../common/error/not.found.error");
const log = (0, debug_1.default)('app:carts-dao');
class CartsDao {
    constructor() {
        log('Created new instance of CartsDao');
    }
    create(cartFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cart = new cart_model_1.Cart(cartFields);
                yield cart.save();
                return cart.id;
            }
            catch (err) {
                if (err instanceof mongoose_1.default.Error.ValidationError) {
                    const message = Object.values(err.errors).map((prop) => prop.message);
                    throw new bad_request_error_1.BadRequestError(message.join('. '), 'create');
                }
                throw new base_error_1.default('Failed to save cart', err, 'create');
            }
        });
    }
    list(limit = 25, page = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            return cart_model_1.Cart.find()
                .limit(limit)
                .skip(limit * page)
                .exec();
        });
    }
    readById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return cart_model_1.Cart.findOne({ _id: cartId }).populate('products.data').exec();
            }
            catch (err) {
                throw new base_error_1.default('Failed to find cart', err, 'readById');
            }
        });
    }
    patchById(cartId, cartFields) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingCart = yield cart_model_1.Cart.findOneAndUpdate({ _id: cartId }, { $set: cartFields }, { new: true }).exec();
                return existingCart;
            }
            catch (err) {
                if (err instanceof mongoose_1.default.Error.ValidationError) {
                    const message = Object.values(err.errors).map((prop) => prop.message);
                    throw new bad_request_error_1.BadRequestError(message.join('. '), 'patchById');
                }
                throw new base_error_1.default('Failed to update cart', err, 'patchById');
            }
        });
    }
    deleteById(cartId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return cart_model_1.Cart.deleteOne({ _id: cartId }).exec();
            }
            catch (err) {
                throw new base_error_1.default('Failed to remove cart', err, 'deleteById');
            }
        });
    }
    addProduct(product, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(cart);
                const productIndex = cart.products.findIndex((item) => item.data.id === product.id);
                if (productIndex === -1) {
                    cart.products.push({ data: product, quantity: 1 });
                }
                else {
                    cart.products[productIndex].quantity += 1;
                }
                return yield cart.save();
            }
            catch (err) {
                throw new base_error_1.default('Failed to add product to cart', err, 'addProduct');
            }
        });
    }
    deleteProductById(product, cart) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productIndex = cart.products.findIndex((item) => item.data.id === product.id);
                if (productIndex !== -1) {
                    cart.products = cart.products.filter((item) => item.data.id !== product.id);
                    return yield cart.save();
                }
                throw new not_found_error_1.NotFoundError('Product not found in cart', 'deleteProductById');
            }
            catch (err) {
                if (err instanceof base_error_1.default)
                    throw err;
                throw new base_error_1.default('Failed to remove product from cart', err, 'deleteProductById');
            }
        });
    }
}
exports.CartsDao = CartsDao;
exports.default = new CartsDao();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5tb25nb29zZS5kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9jb21wb25lbnRzL2NhcnQvZGFvcy9jYXJ0Lm1vbmdvb3NlLmRhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSx3REFBZ0M7QUFDaEMsa0RBQTBCO0FBRzFCLGtGQUF5RDtBQUV6RCwrRUFBMEU7QUFDMUUscURBQTRDO0FBRTVDLDJFQUFzRTtBQUV0RSxNQUFNLEdBQUcsR0FBb0IsSUFBQSxlQUFLLEVBQUMsZUFBZSxDQUFDLENBQUM7QUFFcEQsTUFBYSxRQUFRO0lBQ25CO1FBQ0UsR0FBRyxDQUFDLGtDQUFrQyxDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUVZLE1BQU0sQ0FBQyxVQUEwQjs7WUFDNUMsSUFBSTtnQkFDRixNQUFNLElBQUksR0FBRyxJQUFJLGlCQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNsQixPQUFPLElBQUksQ0FBQyxFQUFFLENBQUM7YUFDaEI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLEdBQUcsWUFBWSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7b0JBQ2pELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUN0RSxNQUFNLElBQUksbUNBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2lCQUN6RDtnQkFDRCxNQUFNLElBQUksb0JBQVMsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDM0Q7UUFDSCxDQUFDO0tBQUE7SUFFWSxJQUFJLENB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