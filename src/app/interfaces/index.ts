import { CurrencyPipe } from "@angular/common";

export interface Employee {
  employeeId: any;
  employeeName: string;
  employeeSurname: string;
  employeePhoneNumber: string;
  employeeIdnumber: number;
  employeeDob: string;
  //title: 'Dr'|'Mr'|'Mrs'|'Miss'|'Ms';
  employeeAddressLine1: string;
  employeeAddressLine2: string;
  id: number;
}

export interface Supplier {
  supplierID: number;
  supplierName: string;
  supplierTypeDesc: string;
  supplierEmail: string;
  supplierNumber: string;
  supplierAddressLine1: string;
  supplierAddressLine2: string;
  supplierAddressLine3: string;
  supplierCityTown: string;
  supplierPostalCode: number;
  supplierBalance : number;
  supplierTypeId : number;
}

export interface UserRole {
  id: number;
  userRoleName: string;
  userRoleDescription: string;
}

export class UserRole {
  id: number;
  userRoleName: string;
  userRoleDescription: string;
  userRoleId: any;
}

export interface Special {
  specialId: number;
  specialImage: string;
  specialDescription: string;
  specialPrice: string;
  specialStartDate: string;
  specialEndDate: string;
}

export interface Courier {
  courierID: number;
  courierName:string;
  courierTypeDescription: string;
  courierEmail: string;
  courierNumber: string;
  courierTypeID: number;
}

export interface Deliveryshift {
  id:number;
  startTime: string ;
  endTime: string;
  dayOfTheWeek: string;
  // firstName: string;
}

export interface Productcategory {
  productCategoryId:number;
  productCategoryDescription: string;
  productCategoryImage: string;
}

export interface Categorytype {
  categoryTypeId:number;
  // image: ImageBitmap;
  categoryTypeDescription: string;
  itemDescription: string;
  productCategoryDesc: string;
  productCategoryID: number;
}

export interface Productitem {
  productItemId:number;
  productItemName: string;
  //productItemDescription:string;
  productItemCost: number;
  quantityOnHand: number;
  categoryTypeId: number;
  }

