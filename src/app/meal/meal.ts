export class Meal {
  id: number;
  description: string;
  calories: number;
  date: Date;
  time: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
