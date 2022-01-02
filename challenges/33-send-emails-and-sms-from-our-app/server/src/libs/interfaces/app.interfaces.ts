import {Types} from "mongoose";

export interface httpServerAddress {
  address?: string;
  family?: string;
  port?: number;
}

interface IEmail {
  value?: string;
  type?: string;
}

interface IPhoto {
  value?: string;
  data: {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
  };
}

export interface IExpressUser extends Express.User {
  facebook: {
    id: string;
    displayName: string;
    _json: {
      id: string;
      name: string;
      picture: IPhoto;
      email?: string;
    };
  };
  photos?: IPhoto[];
  emails?: IEmail[];
  _id: Types.ObjectId;
  displayName: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;

  /*
   *displayName: string;
   *emails?: IEmail[];
   *photos?: IPhoto[];
   *_json: {
   *  id: string;
   *  name: string;
   *  picture?: {
   *    data: {value: string}[];
   *  };
   *  email?: string;
   *};
   */
}
