import knex from "knex";
import {knexfile} from "./knexfile";

export const knexInstance = knex(knexfile.development);
