const fs = require("fs");

export class FsHandler {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save = async (obj) => {
    const data = await this.getAll();
    // We assign the id of the last object of the array or zero in case of being the first item
    this.currentId = data.length > 0 ? data[data.length - 1].id : 0;
    obj.id = ++this.currentId;
    this.products = [...data, obj];

    await fs.promises
      .writeFile(this.fileName, JSON.stringify(this.products, null, "\t"))
      .catch((err) => console.error("File write error:", err));
    return obj.id;
  };

  getById = async (id) => {
    const data = await this.getAll();
    const obj = data.find((obj) => obj.id === id);
    return obj ? obj : null;
  };

  getAll = async () => {
    try {
      return JSON.parse(await fs.promises.readFile(this.fileName, "utf-8"));
    } catch (error) {
      console.warn("File reading error, returning a new one...", error);
      return [];
    }
  };

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
