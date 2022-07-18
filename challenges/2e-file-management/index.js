const fs = require("fs");

class Container {
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

(async function factory() {
  const container = new Container("products.json");
  await container.init();

  await container.save({
    title: "Calculator",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png",
  }); // 1
  await container.save({
    title: "Squad",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-128.png",
  }); // 2
  await container.save({
    title: "Clock",
    price: 345,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png",
  }); // 3

  const thirdElem = container.getById(3); // {
  //   title: "Clock",
  //   price: 345,
  //   thumbnail:
  //     "https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png",
  // }
  console.log(thirdElem);

  await container.deleteById(2); // undefined

  const all = container.getAll(); // [
  // {
  //   title: 'Calculator',
  //   price: 123.45,
  //   thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-128.png',
  //   id: 1
  // },
  // {
  //   title: 'Clock',
  //   price: 345,
  //   thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-128.png',
  //   id: 3
  // }
  // ]
  console.log(all);

  await container.deleteAll(); // undefined
})();
