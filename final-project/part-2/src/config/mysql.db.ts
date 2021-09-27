import knex, {Knex} from "knex";
import {knexfile} from "./knexfile";

export const mysqlKnexInstance: Knex = knex(knexfile.mysql);
