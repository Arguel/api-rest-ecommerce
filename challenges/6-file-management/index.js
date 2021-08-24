const fs = require("fs");

class Archive {
  constructor(filename) {
    this._filename = filename;
  }

  async read() {
    try {
      const rawData = await fs.promises.readFile(
        `${this._filename}.txt`,
        "utf-8",
      );
      const data = JSON.parse(rawData.toString("utf-8"));
      console.log(data);
    } catch {
      console.log(
        `The ${this._filename} file was not found, creating ${this._filename}.txt...`,
      );
      fs.writeFileSync(`${this._filename}.txt`, "", "utf-8");
    }
  }

  set save(productObj) {
    try {
      const rawData = fs.readFileSync(`${this._filename}.txt`, "utf-8");
      const data = JSON.parse(rawData.toString("utf-8"));
      fs.writeFileSync(
        `${this._filename}.txt`,
        JSON.stringify(
          [...data, {...productObj, id: data.length + 1}],
          null,
          "\t",
        ),
        "utf-8",
      );
    } catch {
      fs.writeFileSync(
        `${this._filename}.txt`,
        JSON.stringify([{...productObj, id: 1}], null, "\t"),
        "utf-8",
      );
    }
  }

  get delete() {
    try {
      fs.unlinkSync(`${this._filename}.txt`);
      console.log("File deleted");
    } catch {
      console.log("File not found");
    }
  }
}

const myArchive = new Archive("productos");
myArchive.read();
myArchive.save = {
  title: "pato",
  price: "$200",
  thumbnail: "./img/pato.png",
};
// myArchive.delete;
