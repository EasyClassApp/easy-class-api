import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import morgan from 'morgan';
import 'dotenv/config';
import './database';
import './passport';

export default (app) => {
  if (process.env.NODE_ENV === 'development') {
    // cors
    const corsOptions = {
      origin: [process.env.CLIENT_URL],
    };
    app.use(cors(corsOptions));

    // logging
    app.use(morgan('short'));
  }

  // parse json and compression
  app.use(bodyParser.json());
  app.use(compression());

  // serve static assets when in production
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static('../client/build'));

    // for any other non-api route returns 'index.html'
    app.get(/^\/(?!(api)).*/, (req, res) => {
      res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
    });
  }
};
