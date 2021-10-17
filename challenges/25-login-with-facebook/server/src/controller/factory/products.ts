import {MongodbProducts} from "../mongodb/products";
import {MysqlProducts} from "../mysql/products";
import {ICrudProducts} from "../../utils/crudInterfaces";

export class FactoryProducts {
  // The type() method returns our DAO (data access object)
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
