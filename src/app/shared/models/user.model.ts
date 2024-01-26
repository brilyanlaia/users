export interface UserList {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone?: string;
  website: string;
  company?: Company;
}

export class UserDetail {
  id: number;
  name: string;
  username: string;
  email: string;
  address?: Address;
  phone: string;
  website: string;
  company?: Company;

  constructor() {
    this.id = 0;
    this.name = '';
    this.username = '';
    this.email = '';
    this.phone = '';
    this.website = '';
  }
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoLocation;
}

interface GeoLocation {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}
