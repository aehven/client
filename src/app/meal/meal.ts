export class Meal {
  id: number;
  description: string;
  calories: number;
  dt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
