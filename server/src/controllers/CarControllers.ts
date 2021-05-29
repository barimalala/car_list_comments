import Car from '../models/car';

export default class CarController {
  public async get(): Promise<any> {
    return {
      message: 'car',
    };
  }
}
