
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
