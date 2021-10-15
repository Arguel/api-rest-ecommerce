import {Schema, model, Model} from "mongoose";
import {IUser} from "../../utils/modelsInterfaces";

const userSchema = new Schema<IUser>({
  username: {type: String, required: true},
  password: {type: String, required: true},
});

export const UserModel: Model<IUser> = model<IUser>("User", userSchema);
