import {MongodbCart} from "../mongodb/cart";
import {MysqlCart} from "../mysql/cart";
import {ICrudCart} from "../../utils/crudInterfaces";

export class FactoryCart {
  // The type() method returns our DAO (data access object)
  type(type: string): ICrudCart {
    switch (type) {
      case "mongodb":
        return new MongodbCart();
      case "mysql":
        return new MysqlCart();
      default:
        return new MongodbCart();
    }
  }
}
