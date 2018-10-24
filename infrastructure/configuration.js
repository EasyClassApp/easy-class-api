import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import './database';
import './passport';

export default (app) => {
  // logging
  app.use(morgan('short'));

  // cors
  const corsOptions = {
    origin: [process.env.CLIENT_URL],
  };
  app.use(cors(corsOptions));

  // parse json and compression
  app.use(bodyParser.json());
  app.use(compression());
};
