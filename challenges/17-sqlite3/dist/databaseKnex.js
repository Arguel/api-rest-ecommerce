"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sqlite3_1 = require("./options/sqlite3");
var knex_1 = require("knex");
(0, knex_1.knex)(sqlite3_1.options);
var asd = [
    {
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png",
    },
    {
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png",
    },
    {
        thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
    },
];
(0, knex_1.knex)("products")
    .insert(asd)
    .then(function () { return console.log("insertado"); })
    .catch(function (err) { return console.log(err); })
    .finally(function () { return console.log("termine"); });
