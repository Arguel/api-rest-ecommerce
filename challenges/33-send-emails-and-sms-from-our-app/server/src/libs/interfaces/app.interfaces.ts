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
  value: string;
}

export interface IExpressUser extends Express.User {
  displayName?: string;
  emails?: IEmail[];
  photos?: IPhoto[];
}
