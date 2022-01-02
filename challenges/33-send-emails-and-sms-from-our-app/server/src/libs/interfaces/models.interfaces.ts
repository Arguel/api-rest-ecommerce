import {Types} from "mongoose";

export interface ICart {
  _id?: Types.ObjectId | object | number | string;
  products: object[];
  timestamp?: string;
}

export interface IProduct {
  _id?: Types.ObjectId | object | number | string;
  timestamp?: string;
  name: string;
  description: string;
  code: number;
  thumbnail: string;
  price: number;
  stock: number;
  quantityOnCart?: number;
}

export interface IUser {
  _id?: Types.ObjectId | object | number | string;
  displayName: string;
  password: string;
  facebook?: {
    id: string;
    displayName: string;
    _json: object;
  };
  /*
   *roles: IRole[];
   */
  photos?: String[];
  emails?: String[];
}

export interface IRole {
  _id?: Types.ObjectId | object | number | string;
  name: string;
}
