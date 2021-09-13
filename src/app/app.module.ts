import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatInputModule } from '@angular/material/input';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChartsModule } from 'ng2-charts';

import { GlobalErrorComponent } from './modals/globals/global-error/global-error.component';
import { GlobalConfirmComponent } from './modals/globals/global-confirm/global-confirm.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
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
import {EditSpecialComponent} from './special/add-edit-special/edit-special.component';

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
import { DeliveryReportComponent } from './reports/delivery-report/delivery-report.component';
import { PackingReportComponent } from './reports/packing-report/packing-report.component';
import { StockLevelReportComponent } from './reports/stock-level-report/stock-level-report.component';
import { ViewdeliveryshiftscheduleComponent } from './deliveryshift/viewdeliveryshiftschedule/viewdeliveryshiftschedule.component';
import { ScheduleModule, AgendaService, DragAndDropService, ResizeService, WeekService, WorkWeekService, MonthService, DayService } from '@syncfusion/ej2-angular-schedule';
import { ViewSaleComponent } from './admin/online-sales/view-sale/view-sale.component';
import { ViewDeliveryDetailsComponent } from './deliveryshift/view-delivery-details/view-delivery-details.component';
import { ViewEmployeeDeliveryShiftsComponent } from './deliveryshift/view-employee-delivery-shifts/view-employee-delivery-shifts.component';


const firebaseConfig = {
  apiKey: "AIzaSyDF8jZluZQu1iARJPootZqStlIMNnQ6OFA",
  authDomain: "nkap-storage.firebaseapp.com",
  projectId: "nkap-storage",
  storageBucket: "nkap-storage.appspot.com",
  messagingSenderId: "888332228309",
  appId: "1:888332228309:web:3e2b823fde40b6f534b45c"
};

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
    EditSpecialComponent,
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
    DeliveryReportComponent,
    PackingReportComponent,
    StockLevelReportComponent,
    ViewSaleComponent,
    // ReportsComponent,
    ViewdeliveryshiftscheduleComponent,
    LoginComponent,
    LogoutComponent,
    ViewDeliveryDetailsComponent,
    ViewEmployeeDeliveryShiftsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireStorageModule,
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
    ScheduleModule,
    BrowserModule,
    MatDatepickerModule,
    ChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService, DragAndDropService, ResizeService],
  bootstrap: [AppComponent],

})
export class AppModule { }