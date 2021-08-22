import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';

import { GlobalErrorComponent } from './modals/globals/global-error/global-error.component';
import { GlobalConfirmComponent } from './modals/globals/global-confirm/global-confirm.component';
import { EmployeesComponent } from './employee/employees/employees.component';
import { AddEditEmployeesComponent } from './employee/add-edit-employees/add-edit-employees.component';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { AddEditSupplierComponent } from './supplier/add-edit-supplier/add-edit-supplier.component';
import { SpecialsComponent } from './special/specials/specials.component';
import { AddEditSpecialComponent } from './special/add-edit-special/add-edit-special.component';
import { UserRoleComponent } from './userRole/user-role/user-role.component';
import { AddEditUserRoleComponent } from './userRole/add-edit-user-role/add-edit-user-role.component';
import { CouriersComponent } from './courier/couriers/couriers.component';
import { AddEditCourierComponent } from './courier/add-edit-courier/add-edit-courier.component';
import { DeliveryshiftsComponent } from './deliveryshift/deliveryshifts/deliveryshifts.component';
import { AddEditDeliveryshiftsComponent } from './deliveryshift/add-edit-deliveryshift/add-edit-deliveryshift.component';
import { CategorytypesComponent } from './categorytype/categorytypes/categorytypes.component';
import { AddEditCategorytypesComponent } from './categorytype/add-edit-categorytypes/add-edit-categorytypes.component';
import { ProductitemsComponent } from './productitem/productitems/productitems.component';
import { AddEditProductitemsComponent } from './productitem/add-edit-productitems/add-edit-productitems.component';
import { ProductcategorysComponent } from './productcategory/productcategorys/productcategorys.component';
import { AddEditProductcategorysComponent } from './productcategory/add-edit-productcategorys/add-edit-productcategorys.component';
import { CustomersComponent } from './customer/customers/customers.component';
import { AddEditCustomerComponent } from './customer/add-edit-customer/add-edit-customer.component';

import { MaterialModule } from './material/material/material.module';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { PlaceSupplierOrderComponent } from './supplier/place-supplier-order/place-supplier-order.component';
import { ReceiveSupplierOrderComponent } from './supplier/receive-supplier-order/receive-supplier-order.component';
import { MakePaymentComponent } from './supplier/make-payment/make-payment.component';
import { AddItemsComponent } from './supplier/receive-supplier-order/add-items/add-items.component';
import { WriteOffStockComponent } from './admin/write-off-stock/write-off-stock.component';
import { StockTakeComponent } from './admin/stock-take/stock-take.component';
import { AssignDeliveryOrderComponent } from './admin/assign-delivery-order/assign-delivery-order.component';
import { AssignLocalDeliveryComponent } from './admin/assign-local-delivery/assign-local-delivery.component';
import { AssignCourierDeliveryComponent } from './admin/assign-courier-delivery/assign-courier-delivery.component';
import { PageComponent } from './admin/write-off-stock/page/page.component';
import { StockTakePageComponent } from './admin/stock-take/stock-take-page/stock-take-page.component';
// import { ReceiveOrderComponent } from './supplier/receive-supplier-order/receive-order/receive-order.component';
import { SearchOnlineSalesComponent } from './admin/search-online-sales/search-online-sales.component';
import { OnlineSalesComponent } from './admin/online-sales/online-sales.component';
import { PackOrderComponent } from './admin/pack-order/pack-order.component';
import { SlowSellingProductsReportComponent } from './reports/slow-selling-products-report/slow-selling-products-report.component';
import { MostFrequentBuyersReportComponent } from './reports/most-frequent-buyers-report/most-frequent-buyers-report.component';
import { WeeklySaleOrdersReportComponent } from './reports/weekly-sale-orders-report/weekly-sale-orders-report.component';
import { MonthlySalesOrderReportComponent } from './reports/monthly-sales-order-report/monthly-sales-order-report.component';
import { PopularLocationReportComponent } from './reports/popular-location-report/popular-location-report.component';


@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponent,
    GlobalConfirmComponent,
    EmployeesComponent,
    AddEditEmployeesComponent,
    SuppliersComponent,
    AddEditSupplierComponent,
    SpecialsComponent,
    AddEditSpecialComponent,
    UserRoleComponent,
    AddEditUserRoleComponent,
    HeaderComponent,
    SidenavListComponent,
    CouriersComponent,
    AddEditCourierComponent,
    DeliveryshiftsComponent,
    AddEditDeliveryshiftsComponent,
    CategorytypesComponent,
    AddEditCategorytypesComponent,
    ProductitemsComponent,
    AddEditProductitemsComponent,
    ProductcategorysComponent,
    AddEditProductcategorysComponent,
    CustomersComponent,
    AddEditCustomerComponent,
    PlaceSupplierOrderComponent,
    ReceiveSupplierOrderComponent,
    MakePaymentComponent,
    AddItemsComponent,
    WriteOffStockComponent,
    StockTakeComponent,
    AssignDeliveryOrderComponent,
    AssignCourierDeliveryComponent,
    AssignLocalDeliveryComponent,
    PageComponent,
    StockTakePageComponent,
    // ReceiveOrderComponent,
    SearchOnlineSalesComponent,
    OnlineSalesComponent,
    PackOrderComponent,
    SlowSellingProductsReportComponent,
    MostFrequentBuyersReportComponent,
    WeeklySaleOrdersReportComponent,
    MonthlySalesOrderReportComponent,
    PopularLocationReportComponent,
    // ReportsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatDialogModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
