import dotenv from 'dotenv';

// Enable environment variables
dotenv.config();

const defaultConfig = {
  server: {
    port: process.env.PORT || '8080',
    domain: 'localhost',
  },
};

export default defaultConfig;
