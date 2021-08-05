import { AddEditSupplierComponent } from './supplier/add-edit-supplier/add-edit-supplier.component';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditEmployeesComponent } from './employee/add-edit-employees/add-edit-employees.component';
import { EmployeesComponent } from './employee/employees/employees.component';

import { SpecialsComponent } from './special/specials/specials.component';
import { AddEditSpecialComponent } from './special/add-edit-special/add-edit-special.component';

import { UserRoleComponent } from './userRole/user-role/user-role.component';
import { AddEditUserRoleComponent } from './userRole/add-edit-user-role/add-edit-user-role.component';

import { HomeComponent } from './home/home.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
