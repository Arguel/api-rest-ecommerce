"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
var mongoose_1 = require("mongoose");
var roleSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
});
exports.RoleModel = (0, mongoose_1.model)("Role", roleSchema);
