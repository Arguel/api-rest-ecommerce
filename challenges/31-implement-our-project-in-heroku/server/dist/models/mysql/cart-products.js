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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMySQL = void 0;
var mysql_db_1 = require("../../database/mysql.db");
function connectMySQL() {
    return __awaiter(this, void 0, void 0, function () {
        var connecedCartScheme, connecedProductScheme, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    return [4 /*yield*/, mysql_db_1.mysqlKnexInstance.schema.hasTable("carts")];
                case 1:
                    connecedCartScheme = _a.sent();
                    if (!!connecedCartScheme) return [3 /*break*/, 3];
                    return [4 /*yield*/, mysql_db_1.mysqlKnexInstance.schema.createTable("carts", function (t) {
                            t.increments("_id");
                            t.string("products", 20000).notNullable();
                            t.timestamp("timestamp")
                                .defaultTo(mysql_db_1.mysqlKnexInstance.fn.now())
                                .notNullable();
                        })];
                case 2:
                    _a.sent();
                    console.log("Cart table created");
                    _a.label = 3;
                case 3: return [4 /*yield*/, mysql_db_1.mysqlKnexInstance.schema.hasTable("products")];
                case 4:
                    connecedProductScheme = _a.sent();
                    if (!!connecedProductScheme) return [3 /*break*/, 6];
                    return [4 /*yield*/, mysql_db_1.mysqlKnexInstance.schema.createTable("products", function (t) {
                            t.increments("_id");
                            t.timestamp("timestamp")
                                .defaultTo(mysql_db_1.mysqlKnexInstance.fn.now())
                                .notNullable();
                            t.string("name").notNullable();
                            t.string("description", 1000).notNullable();
                            t.integer("code", 15).notNullable();
                            t.string("thumbnail", 400).notNullable();
                            t.integer("price", 15).notNullable();
                            t.integer("stock", 10).notNullable();
                        })];
                case 5:
                    _a.sent();
                    console.log("Products table created");
                    _a.label = 6;
                case 6:
                    // If both schemes exist
                    if (connecedCartScheme && connecedProductScheme)
                        console.log("MySQL connection SUCCESS");
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.error(err_1.message || "MySQL connection FAIL");
                    process.exit(1);
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.connectMySQL = connectMySQL;
