"use strict";
function getRandomInt(min, max) {
    return "" + (Math.floor(Math.random() * (max - min)) + min);
}
process.on("message", function (qty) {
    var totalNumbers = {};
    for (var i = 0; i < parseInt(qty); i++) {
        var random = getRandomInt(1, 1000);
        if (random in totalNumbers)
            totalNumbers[random] = totalNumbers[random] + 1;
        else
            totalNumbers[random] = 1;
    }
    if (process.send)
        process.send(totalNumbers);
});
