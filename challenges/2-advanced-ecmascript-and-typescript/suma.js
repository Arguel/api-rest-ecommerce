"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const Suma = /** @class */ (function () {
    function Suma(a, b) {
        this.resultado = 0;
        this.resultado = a + b;
    }
    Suma.prototype.ver = function () {
        return this.resultado;
    };
    return Suma;
}());
exports.default = Suma;
