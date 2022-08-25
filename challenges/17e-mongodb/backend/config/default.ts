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
    persistence: process.env.PERSISTENCE || EPersistenceType.mongoatlas,
    mode: process.env.MODE,
  },
  databases: {
    mongolocal: {
      port: process.env.MONGO_LOCAL_PORT || 27017,
      host: process.env.MONGO_LOCAL_HOST || '0.0.0.0',
      database: process.env.MONGO_LOCAL_DB || 'mongolocaldb',
    },
    mongoatlas: {
      user: process.env.MONGO_ATLAS_USER || 'user',
      password: process.env.MONGO_ATLAS_PASSWORD || 'password',
      clusterurl: process.env.MONGO_ATLAS_CLUSTER_URL || 'clusterurl',
      database: process.env.MONGO_ATLAS_DB || 'mongoatlasdb',
    },
  },
};

export default defaultConfig;
