"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messagesController = void 0;
const sqlite3_1 = require("../services/sqlite3");
class Container {
    constructor(table_name) {
        this.table_name = table_name;
        this.getAll = async () => {
            try {
                const current_msg_list = await sqlite3_1.sqLite_service.get_all(this.table_name);
                if (current_msg_list.length > 0) {
                    return current_msg_list;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.log("Algo salio mal:", err.message);
            }
        };
        this.save = async (new_msg_data) => {
            try {
                await sqlite3_1.sqLite_service.save(new_msg_data, this.table_name);
            }
            catch (err) {
                console.log("Algo salio mal:", err.message);
            }
        };
    }
}
exports.messagesController = new Container("messages");
//# sourceMappingURL=messages.js.map