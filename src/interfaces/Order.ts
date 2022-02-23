import { Owner } from './Owner';

export interface Order {
  orderedDate: Date;
  number: string;
  owners: Owner[];
  adress: string;
  office: string;
  city: string;
  department: string;
  state: string;
  enrollmentNumber: number;
  folioNumber: number;
  volumeNumer: number;
  yearNumber: number;
  observations: string;
  orderAmmount: number;
  informedDate: Date;
  totalArea: number;
  bankName: string;
}
