export class User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  address: string;
  // this isn't necessary if open maps in new tab with address query
  // latitude: float;
  // longitude: float;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
