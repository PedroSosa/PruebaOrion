import { Address } from './address';
export interface Employee {
  name: string;
  lastName: string;
  phone: number;
  id: number;
  dob: Date;
  address?: any;
}
