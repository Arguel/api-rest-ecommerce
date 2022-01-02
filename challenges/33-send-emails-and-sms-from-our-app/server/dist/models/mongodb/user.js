"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
var mongoose_1 = require("mongoose");
/*
 *import {Types} from "mongoose";
 */
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var userSchema = new mongoose_1.Schema({
    displayName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    facebook: {
        type: {
            id: { type: String, required: true },
            displayName: { type: String, required: true },
            _json: { type: Object, required: true },
        },
        required: false,
    },
    /*
     *roles: [
     *  {
     *    ref: "Role",
     *    type: Types.ObjectId,
     *  },
     *],
     */
    photos: [
        {
            type: String,
            required: false,
        },
    ],
    emails: [
        {
            type: String,
            required: false,
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
