"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.productSchema = void 0;
const mongoose_service_1 = __importDefault(require("../../../services/mongoose/mongoose.service"));
const Schema = mongoose_service_1.default.getMongoose().Schema;
exports.productSchema = new Schema({
    name: { type: String, required: true },
    description: String,
    productCode: Number,
    thumbnailUrl: String,
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
}, {
    timestamps: true,
});
exports.productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    },
});
exports.Product = mongoose_service_1.default.getMongoose().model('Product', exports.productSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdC5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvcHJvZHVjdC9tb2RlbHMvcHJvZHVjdC5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtR0FBMEU7QUFFMUUsTUFBTSxNQUFNLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFFdkMsUUFBQSxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQ3JDO0lBQ0UsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFO0lBQ3RDLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFdBQVcsRUFBRSxNQUFNO0lBQ25CLFlBQVksRUFBRSxNQUFNO0lBQ3BCLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRTtJQUN2QyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUU7Q0FDeEMsRUFDRDtJQUNFLFVBQVUsRUFBRSxJQUFJO0NBQ2pCLENBQ0YsQ0FBQztBQUVGLHFCQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtJQUMxQixRQUFRLEVBQUUsSUFBSTtJQUNkLFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFNBQVMsRUFBRSxVQUFVLEdBQUcsRUFBRSxHQUFHO1FBQzNCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQztJQUNqQixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0FBRVUsUUFBQSxPQUFPLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQ3hELFNBQVMsRUFDVCxxQkFBYSxDQUNkLENBQUMifQ==