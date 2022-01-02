import {Schema, model, Model} from "mongoose";
import {IUser} from "../../libs/interfaces/models.interfaces";
/*
 *import {Types} from "mongoose";
 */
import bcrypt from "bcryptjs";

interface IUserModel extends Model<IUser> {
  encryptPassword(password: string): string;
  comparePassword(password: string, receivedPassword: string): boolean;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    displayName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    facebook: {
      type: {
        id: {type: String, required: true},
        displayName: {type: String, required: true},
        _json: {type: Object, required: true},
      },
      required: false,
    },
    /*
     *roles: [
     *  {
     *    ref: "Role",
     *    type: Types.ObjectId,
     *  },
     *],
     */
    photos: [
      {
        type: String,
        required: false,
      },
    ],
    emails: [
      {
        type: String,
        required: false,
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
