"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysqlKnexInstance = void 0;
var knex_1 = __importDefault(require("knex"));
var knexfile_1 = require("./knexfile");
// This instance is used for all queries related to the database
exports.mysqlKnexInstance = (0, knex_1.default)(knexfile_1.knexfile.mysql);
