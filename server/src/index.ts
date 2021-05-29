import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

import Router from './routes';

dotenv.config();
import fs = require('fs');
import { errorHandler } from './middlewares/error-handler';

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

const swaggerFile: any = process.cwd() + '/src/swagger.json';
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

app.use('/api', Router);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const start = async () => {
  if (!process.env.DB_URI) {
    throw new Error('DB_URI must be defined');
  }

  try {
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

start();
