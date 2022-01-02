import {mysqlKnexInstance} from "../../database/mysql.db";

export async function connectMySQL(): Promise<void> {
  /* This basically creates the tables if they do not exist in the mysql
   * database or if they exist it shows a message that they are already
   * available to be used */
  try {
    const connecedCartScheme: boolean = await mysqlKnexInstance.schema.hasTable(
      "carts",
    );

    // If the carts schema does not exist
    if (!connecedCartScheme) {
      await mysqlKnexInstance.schema.createTable("carts", (t) => {
        t.increments("_id");
        t.string("products", 20000).notNullable();
        t.timestamp("timestamp")
          .defaultTo(mysqlKnexInstance.fn.now())
          .notNullable();
      });
      console.log("Cart table created");
    }

    const connecedProductScheme: boolean =
      await mysqlKnexInstance.schema.hasTable("products");

    // If the products schema does not exist
    if (!connecedProductScheme) {
      await mysqlKnexInstance.schema.createTable("products", (t) => {
        t.increments("_id");
        t.timestamp("timestamp")
          .defaultTo(mysqlKnexInstance.fn.now())
          .notNullable();
        t.string("name").notNullable();
        t.string("description", 1000).notNullable();
        t.integer("code", 15).notNullable();
        t.string("thumbnail", 400).notNullable();
        t.integer("price", 15).notNullable();
        t.integer("stock", 10).notNullable();
      });
      console.log("Products table created");
    }

    // If both schemes exist
    if (connecedCartScheme && connecedProductScheme)
      console.log("MySQL connection SUCCESS");
  } catch (err) {
    console.error((err as Error).message || "MySQL connection FAIL");
  }
}
