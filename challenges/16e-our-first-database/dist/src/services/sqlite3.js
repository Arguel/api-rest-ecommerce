"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqLite_service = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../../knexfile"));
class Sqlite_DB {
    constructor(enviroment = process.env.SQlite_ENV || "localStorage", DB = knex_1.default(knexfile_1.default[enviroment])) {
        this.enviroment = enviroment;
        this.DB = DB;
        this.init = async () => {
            try {
                const hasTable = await this.DB.schema.hasTable("messages");
                if (!hasTable) {
                    await this.DB.schema.createTable("messages", (msg_table) => {
                        msg_table.increments();
                        msg_table.string("email").notNullable();
                        msg_table.string("text").notNullable();
                        msg_table
                            .timestamp("date", { useTz: true })
                            .defaultTo(this.DB.fn.now());
                    });
                }
            }
            catch (err) {
                console.log("Algo salio mal:", err.message);
            }
        };
        this.get_all = async (table_name) => {
            const current_msg_list = await this.DB(table_name);
            return current_msg_list;
        };
        this.save = async (new_msg_data, table_name) => {
            await this.DB(table_name).insert(new_msg_data);
        };
        console.log(`DB sqlite3 setting as ${this.enviroment}`);
    }
}
exports.sqLite_service = new Sqlite_DB();
//# sourceMappingURL=sqlite3.js.map