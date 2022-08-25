// import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import debug from 'debug';
import { CreateUserDto } from '../dto/create.user.dto';
import { PatchUserDto } from '../dto/patch.user.dto';
import { PutUserDto } from '../dto/put.user.dto';
import { User } from '../models/user.model';

const log: debug.IDebugger = debug('app:users-dao');

class UsersDao {
  constructor() {
    log('Created new instance of UsersDao');
  }

  public async addUser(userFields: CreateUserDto) {
    const userId = nanoid();
    const user = new User({
      id: userId,
      permissionLevel: 1,
      ...userFields,
    });
    await user.save();
    return userId;
  }

  public async getUserByEmail(email: string) {
    return User.findOne({ email: email }).exec();
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

  public async updateUserById(
    userId: string,
    userFields: PatchUserDto | PutUserDto
  ) {
    const existingUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: userFields },
      { new: true }
    ).exec();

    return existingUser;
  }
}

export default new UsersDao();
