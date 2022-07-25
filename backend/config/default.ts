import dotenv from 'dotenv';

// Enable environment variables
const dotenvResult = dotenv.config();
if (dotenvResult.error) {
  throw dotenvResult.error;
}

const defaultConfig = {
  server: {
    port: process.env.PORT || '8080',
    domain: 'localhost',
  },
};

export default defaultConfig;
