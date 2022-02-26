import { string } from 'yup';
export interface Owner {
  firstName: string;
  lastName: string;
  dni: string;
  dniType: string;
  ownerType: string;
}

export interface OwnerDocument extends Owner {
  _id: string;
}
