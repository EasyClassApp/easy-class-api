import mongoose from 'mongoose';

const connectionString = {
  development: {
    databaseUri: process.env.DB_URI,
  },
  production: {
    databaseUri: process.env.DB_URI,
  },
  test: {
    databaseUri: process.env.DB_URI_TEST,
  },
};

const db = connectionString[process.env.NODE_ENV].databaseUri;
mongoose.connect(db);
