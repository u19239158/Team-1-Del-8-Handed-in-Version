import { CurrencyPipe } from "@angular/common";

export interface Employee {
  employeeId: any;
  employeeName: string;
  employeeSurname: string;
  employeeCellphoneNumber: number;
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
  supplierNumber: number;
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
  id: number;
  name:string;
  type: 'International'|'National';
  email: string;
  contactNumber: number;
}

export interface Deliveryshift {
  id:number;
  startTime: '08:00' | '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' ;
  endTime: '09:00' | '10:00' | '11:00' | '12:00' | '13:00' | '14:00' | '15:00' | '16:00';
  date: string;
}

export interface Productcategory {
  productCategoryId:number;
  productCategoryDescription: string;
  productCategoryImage: string;
}

export interface Categorytype {
  categoryTypeId:number;
  // image: ImageBitmap;
  categoryType: string;
  productCategoryName: |'Product Category 1'|'Product Category 2'|'Product Category 3'|'Product Category 4';
}

export interface Productitem {
  productItemId:number;
  productItemName: string;
  productItemDescription:string;
  productItemCost: number;
  productItemQuantityOnHand: number;
  categorytype: 'Product Category 1'|'Product Category 2'|'Product Category 3'|'Product Category 4';
  }

