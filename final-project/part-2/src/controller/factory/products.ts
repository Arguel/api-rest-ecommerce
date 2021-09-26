import {MongodbProducts} from "../mongodb/products";
import {ICrudProducts} from "../../utils/crudInterfaces";

export class FactoryProducts {
  type(type: string): ICrudProducts {
    switch (type) {
      case "mongodb":
        return new MongodbProducts();
      case "mysql":
        return new MysqlProducts();
      default:
        return new MongodbProducts();
    }
  }
}
