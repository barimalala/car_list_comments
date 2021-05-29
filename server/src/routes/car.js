import express from 'express';
import PingController from '../controllers/ping';
import CarController from '../controllers/CarControllers';

const router = express.Router();

router.get('/car', async (_req, res) => {
  const controller = new CarController();
  const response = await controller.get();
  return res.send(response);
});

router.get('/ping', async (_req, res) => {
  const controller = new PingController();
  const response = await controller.getMessage();
  return res.send(response);
});

export default router;
