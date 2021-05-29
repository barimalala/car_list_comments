import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import swaggerJSDoc from 'swagger-jsdoc';

import Router from './routes';

dotenv.config();
import fs = require('fs');

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static('public'));

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
    description:
      'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
    license: {
      name: 'Licensed Under MIT',
      url: 'https://spdx.org/licenses/MIT.html',
    },
    contact: {
      name: 'JSONPlaceholder',
      url: 'https://jsonplaceholder.typicode.com',
    },
  },
  servers: [
    {
      url: 'http://localhost:8000',
      description: 'Development',
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerFile: any = process.cwd() + '/src/swagger.json';
const swaggerData: any = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDocument = JSON.parse(swaggerData);

app.use(Router);

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

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});

start();
