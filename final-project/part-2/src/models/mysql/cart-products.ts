import {mysqlKnexInstance} from "../../config/mysql.db";

export async function connectMySQL(): Promise<void> {
  try {
    const connecedCartScheme = await mysqlKnexInstance.schema.hasTable("carts");
    if (!connecedCartScheme) {
      await mysqlKnexInstance.schema.createTable("carts", (t) => {
        t.increments("_id");
        t.string("products", 20000);
        t.timestamp("timestamp");
      });
      console.log("Cart table created");
    }
    const connecedProductScheme = await mysqlKnexInstance.schema.hasTable(
      "products",
    );
    if (!connecedProductScheme) {
      await mysqlKnexInstance.schema.createTable("products", (t) => {
        t.increments("_id");
        t.timestamp("timestamp");
        t.string("name");
        t.string("description", 1000);
        t.integer("code", 15);
        t.string("thumbnail", 400);
        t.integer("price", 15);
        t.integer("stock", 10);
      });
      console.log("Products table created");
    }
    if (connecedCartScheme && connecedProductScheme)
      console.log("MySQL connection SUCCESS");
  } catch (err) {
    console.error((err as Error).message || "MySQL connection FAIL");
    process.exit(1);
  }
}
