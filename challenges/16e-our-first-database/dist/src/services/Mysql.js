"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mysql_service = void 0;
const knexfile_1 = __importDefault(require("../../knexfile"));
const knex_1 = __importDefault(require("knex"));
class MySQL_service {
    constructor(enviroment = process.env.MySQL_ENV || "development", DB = knex_1.default(knexfile_1.default[enviroment])) {
        this.enviroment = enviroment;
        this.DB = DB;
        this.init = async () => {
            try {
                const hasTable = await this.DB.schema.hasTable("products");
                if (!hasTable) {
                    await this.DB.schema.createTable("products", (prod_table) => {
                        prod_table.increments();
                        prod_table.string("title").notNullable();
                        prod_table.decimal("price", 9, 2).notNullable();
                        prod_table.string("thumbnail").notNullable();
                        prod_table.timestamp("createdAt").defaultTo(this.DB.fn.now());
                    });
                }
            }
            catch (err) {
                console.log("Algo salio mal:", err.message);
            }
        };
        this.get_all = async (table_name) => {
            const current_product_list = await this.DB(table_name);
            return current_product_list;
        };
        this.save = async (new_product_data, table_name) => {
            await this.DB(table_name).insert(new_product_data);
        };
        console.log(`DB MySQL setting as ${this.enviroment}`);
    }
}
exports.mysql_service = new MySQL_service();
//# sourceMappingURL=Mysql.js.map