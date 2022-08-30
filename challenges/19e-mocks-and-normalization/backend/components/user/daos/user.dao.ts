// import mongoose from 'mongoose';
import debug from 'debug';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IPatchUserDto } from '../dto/patch.user.dto';
import { User } from '../models/user.model';
import { EPermissionLevel } from '../../../common/types/common.permissionlevel.enum';

const log: debug.IDebugger = debug('app:users-dao');

class UsersDao {
  constructor() {
    log('Created new instance of UsersDao');
  }

  public async addUser(userFields: ICreateUserDto) {
    const user = new User({
      ...userFields,
      permissionLevel: EPermissionLevel.FREE_PERMISSION,
    });
    await user.save();
    return user.id;
  }

  public async getUserByEmail(email: string) {
    return User.findOne({ email }).exec();
  }

  public async getUserByEmailWithPassword(email: string) {
    return User.findOne({ email: email })
      .select('id email permissionLevel +password')
      .exec();
  }

  public async removeUserById(userId: string) {
    return User.deleteOne({ _id: userId }).exec();
  }

  public async getUserById(userId: string) {
    return User.findOne({ _id: userId }).populate('User').exec();
  }

  public async getUsers(limit = 25, page = 0) {
    return User.find()
      .limit(limit)
      .skip(limit * page)
      .exec();
  }

  public async updateUserById(userId: string, userFields: IPatchUserDto) {
    const existingUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }
}

export default new UsersDao();
