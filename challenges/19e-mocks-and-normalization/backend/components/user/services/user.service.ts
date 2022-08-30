import UsersDao from '../daos/user.dao';
import { ICrud } from '../../../common/types/crud.interface';
import { ICreateUserDto } from '../dto/create.user.dto';
import { IPatchUserDto } from '../dto/patch.user.dto';

class UsersService implements ICrud {
  public async create(resource: ICreateUserDto) {
    return UsersDao.addUser(resource);
  }

  public async deleteById(id: string) {
    return UsersDao.removeUserById(id);
  }

  public async list(limit?: number, page?: number) {
    return UsersDao.getUsers(limit, page);
  }

  public async patchById(id: string, resource: IPatchUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  public async putById(id: string, resource: IPatchUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  public async readById(id: string) {
    return UsersDao.getUserById(id);
  }

  public async updateById(id: string, resource: ICreateUserDto): Promise<any> {
    return UsersDao.updateUserById(id, resource);
  }

  public async getUserByEmail(email: string) {
    return UsersDao.getUserByEmail(email);
  }
  public async getUserByEmailWithPassword(email: string) {
    return UsersDao.getUserByEmailWithPassword(email);
  }
}

export default new UsersService();
