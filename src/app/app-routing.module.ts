import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditSupplierComponent } from './supplier/add-edit-supplier/add-edit-supplier.component';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { ReceiveSupplierOrderComponent } from './supplier/receive-supplier-order/receive-supplier-order.component';
import { PlaceSupplierOrderComponent } from './supplier/place-supplier-order/place-supplier-order.component';
import { MakePaymentComponent } from './supplier/make-payment/make-payment.component';
import { AddItemsComponent } from './supplier/add-items/add-items.component';

import { AddEditEmployeesComponent } from './employee/add-edit-employees/add-edit-employees.component';
import { EmployeesComponent } from './employee/employees/employees.component';

import { SpecialsComponent } from './special/specials/specials.component';
import { AddEditSpecialComponent } from './special/add-edit-special/add-edit-special.component';

import { UserRoleComponent } from './userRole/user-role/user-role.component';
import { AddEditUserRoleComponent } from './userRole/add-edit-user-role/add-edit-user-role.component';

import { HomeComponent } from './home/home.component';

import { CouriersComponent } from './courier/couriers/couriers.component';
import { AddEditCourierComponent } from './courier/add-edit-courier/add-edit-courier.component';

import { CategorytypesComponent } from './categorytype/categorytypes/categorytypes.component';
import { AddEditCategorytypesComponent } from './categorytype/add-edit-categorytypes/add-edit-categorytypes.component';

import { DeliveryshiftsComponent } from './deliveryshift/deliveryshifts/deliveryshifts.component';
import { AddEditDeliveryshiftsComponent } from './deliveryshift/add-edit-deliveryshift/add-edit-deliveryshift.component';

import { ProductcategorysComponent } from './productcategory/productcategorys/productcategorys.component';
import { AddEditProductcategorysComponent } from './productcategory/add-edit-productcategorys/add-edit-productcategorys.component';

import { ProductitemsComponent } from './productitem/productitems/productitems.component';
import { AddEditProductitemsComponent } from './productitem/add-edit-productitems/add-edit-productitems.component';

import { CustomersComponent } from './customer/customers/customers.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';

import { StockTakeComponent } from './admin/stock-take/stock-take.component';
import { WriteOffStockComponent } from './admin/write-off-stock/write-off-stock.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'employees',
    component: EmployeesComponent,
  },
  {
    path: 'employeesAdd',
    component: AddEditEmployeesComponent
  },
  {
    path: 'employeesEdit/:id',
    component: AddEditEmployeesComponent
  },
  {
    path: 'supplier',
    component: SuppliersComponent
  },
  {
    path: 'supplierAdd',
    component: AddEditSupplierComponent
  },
  {
    path: 'supplierEdit/:id',
    component: AddEditSupplierComponent
  },
  {
    path: 'placeSupplierOrder',
    component: PlaceSupplierOrderComponent
  },
  {
    path: 'receiveSupplierOrder',
    component: ReceiveSupplierOrderComponent
  },
  {
    path: 'makePayment',
    component: MakePaymentComponent
  },
  {
    path: 'addItems',
    component: AddItemsComponent
  },
  {
    path: 'special',
    component: SpecialsComponent
  },
  {
    path: 'specialAdd',
    component: AddEditSpecialComponent
  },
  {
    path: 'specialEdit/:id',
    component: AddEditSpecialComponent
  },
  {
    path: 'userRole',
    component: UserRoleComponent
  },
  {
    path: 'userRoleAdd',
    component: AddEditUserRoleComponent
  },
  {
    path: 'userRoleEdit/:id',
    component: AddEditUserRoleComponent
  },
  {
    path: 'couriers',
    component: CouriersComponent,
  },
  {
    path: 'addCourier',
    component: AddEditCourierComponent
  },
  {
    path: 'editCourier/:id',
    component: AddEditCourierComponent
  },
  {
    path: 'deliveryShift',
    component: DeliveryshiftsComponent,
  },
  {
    path: 'addDeliveryShift',
    component: AddEditDeliveryshiftsComponent
  },
  {
    path: 'editDeliveryShift/:id',
    component: AddEditDeliveryshiftsComponent
  },{
    path: 'productCategory',
    component: ProductcategorysComponent,
  },
  {
    path: 'addProductCategory',
    component: AddEditProductcategorysComponent
  },
  {
    path: 'editProductCategory/:id',
    component: AddEditProductcategorysComponent
  },
  {
    path: 'productItem',
    component: ProductitemsComponent,
  },
  {
    path: 'addProductItem',
    component: AddEditProductitemsComponent,
  },
  {
    path: 'editProductItem/:id',
    component: AddEditProductitemsComponent,
  },
  {
    path: 'categoryType',
    component: CategorytypesComponent,
  },
  {
    path: 'addCategoryType',
    component: AddEditCategorytypesComponent,
  },
  {
    path: 'editCategoryType/:id',
    component: AddEditCategorytypesComponent,
  },
  {
    path: 'customer',
    component: CustomersComponent,
  },
  {
    path: 'addCustomer',
    component: AddEditCustomerComponent,
  },
  {
    path: 'editCustomer/:id',
    component: AddEditCustomerComponent,
  },
  {
    path: 'stockTake',
    component: StockTakeComponent,
  },
  {
    path: 'writeOffStock',
    component: WriteOffStockComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
