export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  expected_calories: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
