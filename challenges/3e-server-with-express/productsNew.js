import {writeFile, readFile} from "fs.promises";

export class FsHandler {
  constructor(fileName) {
    this.fileName = fileName;
  }

  save = async (obj) => {
    const data = await this.readData().catch(() => {
      console.warn("Error reading the file, creating a new one...");
      return [];
    });

    // We assign the id of the last object of the array or zero in case of being the first item
    let currentId = data.length > 0 ? data[data.length - 1].id : 0;
    obj.id = ++currentId;
    data = [...data, obj];

    await this.writeData(data);

    return obj.id;
  };

  getById = async (id) => {
    const data = await this.readData();
    const obj = data.find((obj) => obj.id === id);
    return obj ? obj : null;
  };

  readData = () =>
    readFile(this.fileName, "utf-8").then((data) => JSON.parse(data));

  writeData = (data) =>
    writeFile(this.fileName, JSON.stringify(data, null, "\t"));

  deleteById = async (id) => {
    let data = await this.readData();
    data = data.filter((obj) => obj.id !== id);
    this.writeData(data);
  };

  deleteAll = () => this.writeData([]);
}
