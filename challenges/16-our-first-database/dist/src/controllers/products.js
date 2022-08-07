"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const Mysql_1 = require("../services/Mysql");
class Container {
    constructor(table_name) {
        this.table_name = table_name;
        this.getAll = async () => {
            try {
                const current_product_list = await Mysql_1.mysql_service.get_all(this.table_name);
                if (current_product_list.length > 0) {
                    return current_product_list;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.log("Algo salio mal:", err.message);
            }
        };
        this.save = async (new_product_data) => {
            try {
                await Mysql_1.mysql_service.save(new_product_data, this.table_name);
            }
            catch (err) {
                console.log("Algo salio mal:", err.message);
            }
        };
    }
}
exports.productController = new Container("products");
//# sourceMappingURL=products.js.map