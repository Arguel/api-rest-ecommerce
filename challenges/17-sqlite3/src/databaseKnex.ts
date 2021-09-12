import {options} from "./options/sqlite3";
import {knex} from "knex";

knex(options);

const asd = [
  {
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png",
  },
  {
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png",
  },
  {
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
  },
];

knex("products")
  .insert(asd)
  .then(() => console.log("insertado"))
  .catch((err) => console.log(err))
  .finally(() => console.log("termine"));
