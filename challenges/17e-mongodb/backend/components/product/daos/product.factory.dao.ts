import { ICrud } from '../../../common/types/crud.interface';
import { IFactory } from '../../../common/types/factory.interface';
import { TKeys } from '../../../common/types/factory.persistence.enum';
import config from 'config';

class UserFactory implements IFactory {
  get(key: TKeys): ICrud {
    // return new userMap[k]();
  }
}

const persistenceType = config.get<TKeys>('server.persistence');

export default new UserFactory().get(persistenceType);
