import knex, {Knex} from "knex";
import {knexfile} from "./knexfile";

// This instance is used for all queries related to the database
export const mysqlKnexInstance: Knex = knex(knexfile.mysql);
