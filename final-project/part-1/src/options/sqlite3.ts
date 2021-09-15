import {Knex} from "knex";

export const options: Knex.Config = {
  client: "sqlite3",
  connection: {
    filename: "./dist/db/myFirstDatabase.db",
  },
  useNullAsDefault: true,
};
