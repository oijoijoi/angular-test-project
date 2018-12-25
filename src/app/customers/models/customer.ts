import { CustomerType } from './customer-type';

export interface Customer {
  id: number;
  title: string;
  firstName: string;
  firstNameMetaphone: string;
  lastName: string;
  lastNameMetaphone: string;
  modifiedWhen: number;
  type: CustomerType;
}
