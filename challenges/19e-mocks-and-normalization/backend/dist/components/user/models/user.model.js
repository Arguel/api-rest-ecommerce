"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_service_1 = __importDefault(require("../../../services/mongoose/mongoose.service"));
const Schema = mongoose_service_1.default.getMongoose().Schema;
exports.userSchema = new Schema({
    id: String,
    email: String,
    password: { type: String, select: false },
    firstName: String,
    lastName: String,
    permissionLevel: Number,
}, {
    timestamps: true,
    versionKey: false,
});
exports.User = mongoose_service_1.default.getMongoose().model('User', exports.userSchema);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5tb2RlbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL2NvbXBvbmVudHMvdXNlci9tb2RlbHMvdXNlci5tb2RlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtR0FBMEU7QUFFMUUsTUFBTSxNQUFNLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxNQUFNLENBQUM7QUFFdkMsUUFBQSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQ2xDO0lBQ0UsRUFBRSxFQUFFLE1BQU07SUFDVixLQUFLLEVBQUUsTUFBTTtJQUNiLFFBQVEsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtJQUN6QyxTQUFTLEVBQUUsTUFBTTtJQUNqQixRQUFRLEVBQUUsTUFBTTtJQUNoQixlQUFlLEVBQUUsTUFBTTtDQUN4QixFQUNEO0lBQ0UsVUFBVSxFQUFFLElBQUk7SUFDaEIsVUFBVSxFQUFFLEtBQUs7Q0FDbEIsQ0FDRixDQUFDO0FBRVcsUUFBQSxJQUFJLEdBQUcsMEJBQWUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLGtCQUFVLENBQUMsQ0FBQyJ9