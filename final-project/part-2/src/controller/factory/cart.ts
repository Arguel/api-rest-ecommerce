import {MongodbCart} from "../mongodb/cart";
import {ICrudCart} from "../../utils/crudInterfaces";

export class FactoryCart {
  type(type: string): ICrudCart {
    switch (type) {
      case "mongodb":
        return new MongodbCart();
      case "mysql":
        return new MysqlProducts();
      default:
        return new MongodbCart();
    }
  }
}
