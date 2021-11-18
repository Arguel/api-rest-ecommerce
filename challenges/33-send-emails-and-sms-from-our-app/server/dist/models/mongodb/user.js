"use strict";
const __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : {"default": mod};
};
Object.defineProperty(exports, "__esModule", {value: true});
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_2 = require("mongoose");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [
        {
            ref: "Role",
            type: mongoose_2.Types.ObjectId,
        },
    ],
}, {
    timestamps: true,
});
userSchema.statics.encryptPassword = function (password) {
    return bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync(10));
};
userSchema.statics.comparePassword = function (password, receivedPassword) {
    return bcryptjs_1.default.compareSync(password, receivedPassword);
};
exports.UserModel = (0, mongoose_1.model)("User", userSchema);
