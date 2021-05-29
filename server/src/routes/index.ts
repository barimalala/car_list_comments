import express from 'express';
import PingController from '../controllers/ping';
import CarController from '../controllers/CarControllers';

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of  users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get('/', async (_req, res) => {
  const controller = new CarController();
  const response = await controller.get();
  return res.send(response);
});

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */
router.get('/ping', async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

export default router;
