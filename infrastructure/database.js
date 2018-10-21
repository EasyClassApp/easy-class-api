import mongoose from 'mongoose';

const connectionString = {
  development: {
    databaseUri: process.env.DB_URI,
  },
  production: {
    databaseUri: process.env.DB_URI,
  },
  test: {
    databaseUri: 'mongodb://localhost/easyclass-test',
  },
};

console.log('CONNECTING TO DB ', connectionString[process.env.NODE_ENV].databaseUri); // eslint-disable-line
const db = connectionString[process.env.NODE_ENV].databaseUri;
mongoose.connect(db);
