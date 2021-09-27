import knex, {Knex} from "knex";
import {knexfile} from "./knexfile";

export const knexInstance: Knex = knex(knexfile.mysql);
