const fs = require("fs");

class FsHandler {
  constructor(fileName) {
    this.fileName = fileName;
    this.products = [];
    this.currentId = 0;
  }

  init = async () => {
    try {
      const data = JSON.parse(
        await fs.promises.readFile(this.fileName, "utf-8"),
      );
      this.currentId = data.length > 0 ? data[data.length - 1].id : 0;
      this.products = data;
    } catch (error) {
      console.log("File read error:", error);
    }
  };

  save = async (obj) => {
    try {
      obj.id = ++this.currentId;
      this.products.push(obj);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.products, null, "\t"),
      );
      return obj.id;
    } catch (error) {
      console.log("Error when saving:", error);
    }
  };

  getById = (id) => {
    const obj = this.products.find((obj) => obj.id === id);
    return obj ? obj : null;
  };

  getAll = () => this.products;

  deleteById = async (id) => {
    try {
      this.products = this.products.filter((obj) => obj.id !== id);
      await fs.promises.writeFile(
        this.fileName,
        JSON.stringify(this.products, null, "\t"),
      );
    } catch (error) {
      console.log("Error when it was deleted:", error);
    }
  };

  deleteAll = async () => {
    try {
      this.products = [];
      await fs.promises.writeFile(this.fileName, "[]");
    } catch (error) {
      console.log("File write error:", error);
    }
  };
}

module.exports = FsHandler;
