import { ReportServiceService } from './../services/Reports/report-service.service';
import { CurrencyPipe } from "@angular/common";
import { Identifiers } from "@angular/compiler";
//import * as internal from "node:stream";

export interface Login {
  userUsername: string;
  userPassword: string;
  token : string;
  userId: number;
  userRoleId: number;
  otp: number
}

export interface Log {
  UsersID: number;
}

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
  usersId: number;
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
  supplierBalance: number;
  supplierTypeId: number;
  supplierAmount: number;
  usersId: number;
}

export interface UserRole {
  id: number;
  userRoleName: string;
  userRoleDescription: string;
  usersID: number;
  auditTrailID: number;
  auditTrailDescription: string;
  auditTrailDate :string;
  auditTrailTime: string
  usersId: number;
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
  discountId: number;
  productItemId: number;
  productItemCost: number;
  discountPercentage:number;
  usersId: number;
}

export interface Courier {
  courierID: number;
  courierName: string;
  courierTypeDescription: string;
  courierEmail: string;
  courierNumber: string;
  courierTypeID: number;
  usersId: number;
}

export interface Deliveryshift {
  canBeUpdated: boolean;
  customerBusinessName: string;
  customerSurname: string;
  addressLine2: string;
  addressLine3: number;
  addressLine1: any;
  id: number;
  startTime: string;
  endTime: string;
  dayOfTheWeek: string;
  employeeName: string;
  employeeID: number;
  saleId: number;
  customerName: string;
  deliveryDistance: number;
  orderAddress: string;
  shiftId: number;
  dateId: number;
  timeId: number;
  employeeShiftId: number;
  saleID: number;
  customerCellphoneNumber : string;
  addressPostalCode : number;
  usersId: number;
  maxNumber : number;
}

export interface dshift {
  maxId: number
  maxNumber : number
}

export interface Productcategory {
  productCategoryId: number;
  productCategoryDescription: string;
  productCategoryImage: string;
  usersId: number;
}

export interface Categorytype {
  categoryTypeId: number;
  categoryTypeImage: string;
  categoryTypeDescription: string;
  itemDescription: string;
  productCategoryDesc: string;
  productCategoryID: number;
  usersId: number;
}

export interface Productitem {
  productItemId: number;
  productItemName: string;
  //productItemDescription:string;
  productItemCost: number;
  quantityOnHand: number;
  categoryTypeId: number;
  categoryTypeName: string;
  categoryTypeDescription: string;
  priceDescription: number;
  usersId: number;
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
  usersId: number;
}

export interface ReceiveSupplierOrder {
  supplierOrderID: number;
  productItem: string;
  quantity: number;
  supplierName: string;
  // orderDatePlaced: string;
  // orderDateReceived: string;
  // invoiceNumber: number;
  // invoiceDate: string;
  // invoiceTotal: number;
  // price: string;
  usersId: number;
}

export interface PlaceSupplierOrder {
  supplierName: string;
  checked: boolean;
  productItemId: number;
  supplierID: number;
  supplierproducts: string;
  price: string;
  supplierQuantityOrdered: number;
  highlighted?: boolean;
  hovered?: boolean;
  usersId: number;
}

export class Data {
  public id : number;
  public name: string;
  public quantity: number;
}

export interface place {
   id : number;
   name: string;
   quantity: number;
}

export interface StockTake {
  dateOfStockTake: string;
  categoryType: string;
  productItem: string;
  quantityOnHand: number;
  stockTakeQuantity: number;
  productItemId: number;
  usersId: number;
  productItemName: string;
}

export interface WriteOffStock {
  writtenOffStockId: number;
  writtenOffStockDate: string;
  categoryType: string;
  productItemId: number;
  writeOffQuantity: number;
  writeOffReason: string;
  productItemWrittenOffStockId: number;
  usersId: number;
  productItemName: string;
}

export interface AssignUnscheduledDelivery { //should be in delivery shift. we don't create interfaces for each individual requirement.
  //   saleId:number;
  //   customerName: string;
  //   deliveryDistance: number;
  //   orderAddress: string;
}

export interface ReportParameters {
  startDate: string;
  endDate: string;
  //productCategoryId: number;
}

export interface Reports {
  saleId: number;
  saleOrderDescription: string;
  saleOrderAssign: boolean;
  saleOrderDate: string;
  saleOrderRecieveType: boolean;
  paymentDate: string;
  orderStatusID: number;
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
  productItemId: number;
  productItemName: string;
  quantitySold: number;
  numberOfSales: number;
  numberOfSalesMade: number;
  productCategory: string;
  NumberOfSales : number;
  ProductCategory : string;
}

export interface OnlineSales {
  saleID: number;
  saleOrderDate: string;
  orderStatusId: string;
  orderStatusDescription: string;
  customerId: string;
  customerName: string;
  customerSurname: string;
  customerBusinessName: string;
  customerCellphoneNumber: number;
  customerEmailAddress: string;
  saleAssign: boolean;
  saleOrderDescription: string;
  salePaymentAmount: number;
  salePaymentDate: string;
  saleOrderRecieveType: boolean;
  saleDate: string;
  paymentTypeDescription: string;
  addressId: number;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressPostalCode: string;
  courierName: string;
  courierTypeDescription: string;
  courierEmail: string;
  courierNumber: string;
  usersId: number;
}

export interface MarkUp
{
  markupId : number;
  markupPercentage : number;
}


 