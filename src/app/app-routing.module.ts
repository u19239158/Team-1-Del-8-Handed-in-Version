import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AddEditSupplierComponent } from './supplier/add-edit-supplier/add-edit-supplier.component';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { ReceiveSupplierOrderComponent } from './supplier/receive-supplier-order/receive-supplier-order.component';
import { PlaceSupplierOrderComponent } from './supplier/place-supplier-order/place-supplier-order.component';
import { MakePaymentComponent } from './supplier/make-payment/make-payment.component';
import { AddItemsComponent } from './supplier/receive-supplier-order/add-items/add-items.component';

import { AddEditEmployeesComponent } from './employee/add-edit-employees/add-edit-employees.component';
import { EmployeesComponent } from './employee/employees/employees.component';

import { SpecialsComponent } from './special/specials/specials.component';
import { AddEditSpecialComponent } from './special/add-edit-special/add-edit-special.component';
import { EditSpecialComponent } from './special/add-edit-special/edit-special.component';
import { AddSpecialComponent } from './special/add-edit-special/add-special.component';

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

import { AssignDeliveryOrderComponent } from './admin/assign-delivery-order/assign-delivery-order.component';
import { AssignCourierDeliveryComponent } from './admin/assign-courier-delivery/assign-courier-delivery.component';
import { AssignLocalDeliveryComponent } from './admin/assign-local-delivery/assign-local-delivery.component';

import { CustomersComponent } from './customer/customers/customers.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';

import { StockTakeComponent } from './admin/stock-take/stock-take.component';
import { WriteOffStockComponent } from './admin/write-off-stock/write-off-stock.component';
import { PageComponent } from './admin/write-off-stock/page/page.component';
import { StockTakePageComponent } from './admin/stock-take/stock-take-page/stock-take-page.component';
// import { ReceiveOrderComponent } from './supplier/receive-supplier-order/receive-order/receive-order.component';

import { OnlineSalesComponent } from './admin/online-sales/online-sales.component';
import { SearchOnlineSalesComponent } from './admin/search-online-sales/search-online-sales.component';
import { PackOrderComponent } from './admin/pack-order/pack-order.component';

import { FastSellingProductsReportComponent } from './Reports/fast-selling-products-report/fast-selling-products-report.component';
import { SlowSellingProductsReportComponent } from './reports/slow-selling-products-report/slow-selling-products-report.component';
import { MonthlySalesOrderReportComponent } from './reports/monthly-sales-order-report/monthly-sales-order-report.component';
import { MostFrequentBuyersReportComponent } from './reports/most-frequent-buyers-report/most-frequent-buyers-report.component';
import { PopularLocationReportComponent } from './reports/popular-location-report/popular-location-report.component';
import { WeeklySaleOrdersReportComponent } from './reports/weekly-sale-orders-report/weekly-sale-orders-report.component';
import { PackingReportComponent } from './reports/packing-report/packing-report.component';
import { StockLevelReportComponent } from './reports/stock-level-report/stock-level-report.component';
import { DeliveryReportComponent } from './reports/delivery-report/delivery-report.component';
import { ViewdeliveryshiftscheduleComponent } from './deliveryshift/viewdeliveryshiftschedule/viewdeliveryshiftschedule.component';
import { ViewSaleComponent } from './admin/online-sales/view-sale/view-sale.component';
import { ViewDeliveryDetailsComponent } from './deliveryshift/view-delivery-details/view-delivery-details.component'
import { ViewEmployeeDeliveryShiftsComponent } from './deliveryshift/view-employee-delivery-shifts/view-employee-delivery-shifts.component'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LogoutComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
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
    path: 'makePayment/:id',
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
    path: 'specialAdd/:id',
    component: AddEditSpecialComponent
  },
  {
    path: 'specialEdit/:id',
    component: EditSpecialComponent
  },
  {
    path: 'specialAdd',
    component: AddSpecialComponent
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
    path: 'viewDeliveryDetails/:id',
    component: ViewDeliveryDetailsComponent
  },
  {
    path: 'viewEmployeeDeliveryShifts',
    component: ViewEmployeeDeliveryShiftsComponent
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
  },
  {
    path: 'viewdeliveryshiftschedule',
    component: ViewdeliveryshiftscheduleComponent
  },
  {
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
  {
    path: 'assigndeliveryorder',
    component: AssignDeliveryOrderComponent,
  },
  {
    path: 'assigncourierdelivery/:id',
    component: AssignCourierDeliveryComponent,
  },
  {
    path: 'assignlocaldelivery/:id',
    component: AssignLocalDeliveryComponent,
  },
  {
    path: 'writeOff/:id',
    component: PageComponent,
  },
  {
    path: 'stockTakePage/:id',
    component: StockTakePageComponent,
  },
  // {
  //   path: 'receiveOrder',
  //   component: ReceiveOrderComponent,
  // },
  {
    path: 'onlineSales',
    component: OnlineSalesComponent,
  },
  {
    path: 'viewSale/:id',
    component: ViewSaleComponent,
  },
  {
    path: 'searchOnlineSales',
    component: SearchOnlineSalesComponent,
  },
  {
    path: 'packOrder',
    component: PackOrderComponent,
  },
  {
    path: 'addItems',
    component: AddItemsComponent,
  },
  {
    path: 'fastSellingProductsReport',
    component: FastSellingProductsReportComponent,
  },
  {
    path: 'slowSellingProductsReport',
    component: SlowSellingProductsReportComponent,
  },
  {
    path: 'monthlySalesOrderReport',
    component: MonthlySalesOrderReportComponent
  },
  {
    path: 'weeklySalesOrderReport',
    component: WeeklySaleOrdersReportComponent
  },
  {
    path: 'mostFrequentBuyersReport',
    component: MostFrequentBuyersReportComponent
  },
  {
    path: 'popularLocationsReport',
    component: PopularLocationReportComponent,
  },
  {
    path: 'deliveryReport',
    component: DeliveryReportComponent,
  },
  {
    path: 'stockLevelReport',
    component: StockLevelReportComponent,
  },
  {
    path: 'packingReport',
    component: PackingReportComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
