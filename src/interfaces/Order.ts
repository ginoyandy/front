import { Owner, OwnerDocument } from './Owner';

export interface Order {
  orderedDate: Date;
  orderNumber: string;
  owners: Owner[];
  adress: string;
  streetNumber: string;
  adressFloor: string;
  apartmentNumber: string;
  city: string;
  department: string;
  state: string;
  enrollmentNumber: string;
  folioNumber: string;
  volumeNumber: string;
  yearNumber: number;
  observations: string;
  orderAmmount: number;
  informedDate: Date;
  totalArea: string;
  office: string;
  remittance: string;
  providerFactory: string;
  searchBy: string;
  orderType: string;
  domain: string;
  registryEnterNumber: string;
  district: string;
  bankName: string;
  firstName: string;
  lastName: string;
  dni: string;
  dniType: string;
  ownerType: string;
  ownersObservations: string;
}

export interface OrderDocument extends Order {
  _id: string;
  // owners: OwnerDocument[];
}
