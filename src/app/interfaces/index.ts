export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  contactNumber: string;
  idNumber: string;
  dateOfBirth: string;
  title: 'Dr'|'Mr'|'Mrs'|'Miss'|'Ms';
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  cityTown: string;
  postalCode: string;
}

export interface Supplier {
  id: number;
  supplierName: string;
  supplierType: 'Bolts'|'Hardware'|'Others';
  supplierEmailAddress: string;
  supplierContactNumber: string;
  supplierAddressLine1: string;
  supplierAddressLine2: string;
  supplierAddressLine3: string;
  supplierCityTown: string;
  supplierPostalCode: string;
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
  id: number;
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
  id:number;
  productCategoryName: string;
}

export interface Categorytype {
  id:number;
  // image: ImageBitmap;
  categoryType: string;
  productCategoryName: |'Product Category 1'|'Product Category 2'|'Product Category 3'|'Product Category 4';
}

export interface Productitem {
  id:number;
  name: string;
  description:string;
  cost: number;
  quantity: number;
  categorytype: 'Product Category 1'|'Product Category 2'|'Product Category 3'|'Product Category 4';
  }

