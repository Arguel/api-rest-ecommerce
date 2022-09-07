export interface IUser {
  email: string;
  firstName: string;
  permissionLevel: number;
}

export interface IUserState {
  user: IUser | null;
  token: string;
}
