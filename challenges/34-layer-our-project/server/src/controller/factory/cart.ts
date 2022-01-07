import {MongodbCart} from "../mongodb/cart";
import {MysqlCart} from "../mysql/cart";
import {ICrudCart} from "../../libs/interfaces/crud.interfaces";

export class FactoryCart {
  // The type() method returns our DAO (data access object)
  static type(type: string): ICrudCart {
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
