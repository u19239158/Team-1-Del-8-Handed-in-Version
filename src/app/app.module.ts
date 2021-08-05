import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from './material/material/material.module';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { GlobalErrorComponent } from './modals/globals/global-error/global-error.component';
import { GlobalConfirmComponent } from './modals/globals/global-confirm/global-confirm.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { AddEditEmployeesComponent } from './pages/add-edit-employees/add-edit-employees.component';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { AddEditSupplierComponent } from './supplier/add-edit-supplier/add-edit-supplier.component';
import { SpecialsComponent } from './special/specials/specials.component';
import { AddEditSpecialComponent } from './special/add-edit-special/add-edit-special.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatListModule,
    MatDialogModule,
    MatNativeDateModule
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
