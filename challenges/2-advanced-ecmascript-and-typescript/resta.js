"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const Resta = /** @class */ (function () {
  function Resta(a, b) {
    this.resultado = 0;
    this.resultado = a - b;
  }
  Resta.prototype.ver = function () {
    return this.resultado;
  };
  return Resta;
})();
exports.default = Resta;
