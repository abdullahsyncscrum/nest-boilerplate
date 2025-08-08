import * as dotenv from 'dotenv';
dotenv.config();

const databaseConfig = {
  uri: process.env.MONGO_URI,
};

export default databaseConfig;
