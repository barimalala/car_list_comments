import express from 'express';
import CarController from '../controllers/CarControllers';

const router = express.Router();

router.get('/cars', async (_req, res) => {
  const controller = new CarController();
  try {
    const response = await controller.get();
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.post('/cars', async (req, res) => {
  try {
    const controller = new CarController();
    const response = await controller.post(req.body.car);
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.put('/cars/:id', async (req, res) => {
  try {
    const controller = new CarController();
    const response = await controller.put(
      req.body.car,
      req.url.replace('/cars/', ''),
    );
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete('/cars/:id', async (req, res) => {
  try {
    const controller = new CarController();
    const response = await controller.delete(req.url.replace('/cars/', ''));
    return res.send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
});

export default router;
