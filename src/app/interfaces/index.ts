import { ReportServiceService } from './../services/Reports/report-service.service';
import { CurrencyPipe } from "@angular/common";
import { Identifiers } from "@angular/compiler";
//import * as internal from "node:stream";

export interface Employee {
  employeeId: any;
  employeeName: string;
  employeeSurname: string;
  employeeCellphoneNumber: string;
  employeeIdnumber: number;
  employeeDob: string;
  employeeAddressLine1: string;
  employeeAddressLine2: string;
  id: number;
  userUsername: string;
  userPassword: string;
  employeeConfirmPassword: string;
}

export interface Supplier {
  supplierId: number;
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
  supplierAmount: number;
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
  specialID: number;
  //specialImage: string;
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
  employeeName: string;
  employeeID: number;
  saleId:number;
  customerName: string;
  deliveryDistance: number;
  orderAddress: string;
  shiftId : number;
  dateId : number;
  timeId : number;
  employeeShiftID : number;

}

export interface Productcategory {
  productCategoryId:number;
  productCategoryDescription: string;
  productCategoryImage: string;
}

export interface Categorytype {
  categoryTypeId:number;
  categoryTypeImage: string;
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
  categoryTypeName: string;
  categoryTypeDescription: string;
  }

export interface Customer {
  customerId: number;
  customerUserName: string;
  customerName: string;
  customerSurname: string;
  customerCellphoneNumber: number;
  customerEmailAddress: string;
  customerVATReg: number;
  customerBusinessName: string;
  customerPassword: string;
  titleId: number;
}

export interface ReceiveSupplierOrder {
  id: string;
  orderDatePlaced: string;
  orderDateReceived: string;
  invoiceNumber: number;
  invoiceDate: string;
  invoiceTotal: number;
}

export interface PlaceSupplierOrder {
  productItem: string;
  price: string;
  quantity: number;
}

export interface StockTake{
  dateOfStockTake: string;
  categoryType: string;
  productItem: string;
  quantityOnHand: number;
  stockTakeQuantity: number;
  productItemId: number;
}

export interface WriteOffStock {
  writtenOffStockId: number;
  writtenOffStockDate: string;
  categoryType: string;
  productItemId: number;
  writeOffQuantity: number;
  writeOffReason: string;
  productItemWrittenOffStockId: number;
}

export interface AssignUnscheduledDelivery { //should be in delivery shift. we don't create interfaces for each individual requirement.
//   saleId:number;
//   customerName: string;
//   deliveryDistance: number;
//   orderAddress: string;
 }

export interface Reports {
saleId: number;
saleOrderDescription: string;
saleOrderAssign: boolean;
saleOrderDate: string;
saleOrderRecieveType: boolean;
paymentDate: string;
orderStatusId: number;
orderStatusDescription: string;
customerId: number;
customerName: string;
customerSurname: string;
customerCellphonenUmber: string;
customerEmailAddress: string;
addressId: number;
addressLine1: string;
addressLine2: string;
addressLine3: string;
startDate: string;
endDate: string;
}

export interface OnlineSales {
  saleID: number;
  saleOrderDate: string;
  orderStatusId: string;
  orderStatusDescription: string;
  customerId:string;
  customerName: string;
  customerSurame: string;
  customerBusinessname: string;

}



