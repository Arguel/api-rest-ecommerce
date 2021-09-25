import {persistenceType} from "../config/factoryType";
import {FactoryProducts, ICrudProducts} from "./factory/products";

// Main switch/selector for persistence types
const factory = new FactoryProducts();

export class ProductsController {
  factory: ICrudProducts;

  constructor() {
    this.factory = factory.type(persistenceType);
  }
  getProducts(req, res) {
    return this.factory.getProducts(req, res);
  }
}
