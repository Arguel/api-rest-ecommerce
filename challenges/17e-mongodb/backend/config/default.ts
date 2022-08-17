import dotenv from 'dotenv';
import { EPersistenceType } from '../common/types/factory.persistence.enum';

// Enable environment variables
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const defaultConfig = {
  server: {
    port: process.env.PORT || 3000,
    domain: 'localhost',
    /**
     * Persistence is equal to:
     * 'memory' | 'filesystem' | 'mysql' | 'sqlite3' | 'mongolocal' | 'mongoatlas' | 'firebase';
     */
    persistence: process.env.PERSISTENCE || EPersistenceType.filesystem,
    mode: process.env.MODE,
  },
  databases: {
    mongolocal: {
      port: 27017,
      host: 'localhost',
    },
  },
};

export default defaultConfig;
