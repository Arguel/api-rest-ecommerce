"use strict";
const _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}
class Archive {
  constructor(filename) {
    this._filename = filename;
  }
  async read() {
    try {
      const rawData = await _fs.default.promises.readFile(`./${this._filename}.txt`, "utf-8");
      const data = JSON.parse(rawData.toString("utf-8"));
      return data;
    } catch {
      console.log(`The ${this._filename} file was not found, creating ${this._filename}.txt...`);
      _fs.default.writeFileSync(`./${this._filename}.txt`, "", "utf-8");
    }
  }
  set save(productObj) {
    try {
      const rawData = _fs.default.readFileSync(`./${this._filename}.txt`, "utf-8");
      const data = JSON.parse(rawData.toString("utf-8"));
      _fs.default.writeFileSync(
        `./${this._filename}.txt`,
        JSON.stringify([...data, {...productObj, id: data.length}], null, "\t"),
        "utf-8",
      );
    } catch {
      _fs.default.writeFileSync(
        `./${this._filename}.txt`,
        JSON.stringify([{...productObj, id: 1}], null, "\t"),
        "utf-8",
      );
    }
  }
  get delete() {
    _fs.default.unlinkSync(this._filename);
  }
}
const myArchive = new Archive("productos");
console.log(myArchive.read);
myArchive.save = {title: "pato", price: "$200", thumbnail: "./img/pato.png"};
console.log(myArchive.read);
console.log("asd");
