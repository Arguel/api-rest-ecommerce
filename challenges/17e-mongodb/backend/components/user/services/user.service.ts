import UsersDao from '../daos/user.dao';
import {ICrud} from '../../../common/types/crud.interface';
import {CreateUserDto} from '../dto/create.user.dto';
import {PutUserDto} from '../dto/put.user.dto';
import {PatchUserDto} from '../dto/patch.user.dto';

class UsersService implements ICrud {
    public async create(resource: CreateUserDto) {
        resource.permissionLevel = 1;
        return UsersDao.addUser(resource);
    }

    public async deleteById(id: string) {
        return UsersDao.removeUserById(id);
    }

    public async list(limit: number, page: number) {
        return UsersDao.getUsers(limit, page);
    }

    public async patchById(id: string, resource: PatchUserDto): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    public async putById(id: string, resource: PutUserDto): Promise<any> {
        return UsersDao.updateUserById(id, resource);
    }

    public async readById(id: string) {
        return UsersDao.getUserById(id);
    }

    public async updateById(id: string, resource: CreateUserDto): Promise<any> {
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
