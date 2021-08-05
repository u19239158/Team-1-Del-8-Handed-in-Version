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
  supplierEmailAddress: string;
  supplierContactNumber: string;
  supplierAddressLine1: string;
  supplierAddressLine2: string;
  supplierAddressLine3: string;
  supplierCityTown: string;
  supplierPostalCode: string;
}

export interface User {
  id: number;
  name: string;
}

export interface UserRole {
  id: number;
  userRole: 'Customer'|'Admin'|'Employee';
}

export interface Special {
  id: number;
}
