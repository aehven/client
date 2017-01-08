export class Meal {
  id: number;
  description: string;
  calories: number;
  date: Date;
  time: Time;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
