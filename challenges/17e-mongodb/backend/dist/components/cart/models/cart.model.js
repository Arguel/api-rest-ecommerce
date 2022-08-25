"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = exports.cartSchema = void 0;
const mongoose_service_1 = __importDefault(require("../../../services/mongoose/mongoose.service"));
const Schema = mongoose_service_1.default.getMongoose().Schema;
exports.cartSchema = new Schema({
    products: [
        {
            _id: false,
            data: { type: 'ObjectId', ref: 'Product' },
            quantity: { type: Number, required: true },
        },
    ],
}, {
    timestamps: true,
});
exports.cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
exports.Cart = mongoose_service_1.default.getMongoose().model('Cart', exports.cartSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FydC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvY2FydC9tb2RlbHMvY2FydC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtR0FBMEU7QUFFMUUsTUFBTSxNQUFNLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFFdkMsUUFBQSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQ2xDO0lBQ0UsUUFBUSxFQUFFO1FBQ1I7WUFDRSxHQUFHLEVBQUUsS0FBSztZQUNWLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRTtZQUMxQyxRQUFRLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7U0FDM0M7S0FDRjtDQUNGLEVBQ0Q7SUFDRSxVQUFVLEVBQUUsSUFBSTtDQUNqQixDQUNGLENBQUM7QUFFRixrQkFBVSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7SUFDdkIsUUFBUSxFQUFFLElBQUk7SUFDZCxVQUFVLEVBQUUsS0FBSztJQUNqQixTQUFTLEVBQUUsVUFBVSxHQUFHLEVBQUUsR0FBRztRQUMzQixPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUM7SUFDakIsQ0FBQztDQUNGLENBQUMsQ0FBQztBQUVVLFFBQUEsSUFBSSxHQUFHLDBCQUFlLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxrQkFBVSxDQUFDLENBQUMifQ==