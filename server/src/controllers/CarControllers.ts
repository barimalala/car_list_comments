import CarModel, { carType } from '../models/car';

export default class CarController {
  public async get(): Promise<any> {
    let carList = await CarModel.find().populate('comment');
    return carList;
  }

  public async post(carData: carType): Promise<any> {
    const car = new CarModel(carData);
    const result = await car.save();
    return result;
  }

  public async put(carData: carType, id: string): Promise<any> {
    const car = await CarModel.findById(id);
    if (!car) {
      return { message: 'Please verify your ID' };
    }
    car.set(carData);
    const result = await car.save();
    return result;
  }

  public async delete(id: string): Promise<any> {
    const car = await CarModel.findById(id);
    if (!car) {
      return { message: 'Please verify your ID' };
    }
    const result = await car.remove();
    return result;
  }
}
