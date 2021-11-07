import {Schema, model, Model} from "mongoose";
import {IUser} from "../../libs/interfaces/models.interfaces";
import {Types} from "mongoose";
import bcrypt from "bcryptjs";

interface IUserModel extends Model<IUser> {
  encryptPassword(password: string): string;
  comparePassword(password: string, receivedPassword: string): boolean;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    roles: [
      {
        ref: "Role",
        type: Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  },
);

userSchema.statics.encryptPassword = (password: string): string => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.statics.comparePassword = (
  password: string,
  receivedPassword: string,
): boolean => {
  return bcrypt.compareSync(password, receivedPassword);
};

export const UserModel = model<IUser, IUserModel>("User", userSchema);
