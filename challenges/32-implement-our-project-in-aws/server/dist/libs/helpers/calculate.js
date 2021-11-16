"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
exports.randomNum = exports.getRandomInt = void 0;
process.on("message", function (qty) {
    if (process.send)
        process.send(randomNum(qty));
});
function getRandomInt(min, max) {
    return "" + (Math.floor(Math.random() * (max - min)) + min);
}
exports.getRandomInt = getRandomInt;
function randomNum(qty) {
    const totalNumbers = {};
    for (let i = 0; i < parseInt(qty); i++) {
        const random = getRandomInt(1, 1000);
        if (random in totalNumbers)
            totalNumbers[random] = totalNumbers[random] + 1;
        else
            totalNumbers[random] = 1;
    }
    return totalNumbers;
}
exports.randomNum = randomNum;
