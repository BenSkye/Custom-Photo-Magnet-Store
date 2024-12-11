import { IAddress } from './address.interface';

export interface ICustomer {
    fullName: string;
    phone: string;
    address: IAddress;
    note?: string;
}