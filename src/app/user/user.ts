export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  address: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
