import { AddEditSupplierComponent } from './supplier/add-edit-supplier/add-edit-supplier.component';
import { SuppliersComponent } from './supplier/suppliers/suppliers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditEmployeesComponent } from './pages/add-edit-employees/add-edit-employees.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { SpecialsComponent } from './special/specials/specials.component';
import { AddEditSpecialComponent } from './special/add-edit-special/add-edit-special.component';

const routes: Routes = [
  {
    path: '',
    component: EmployeesComponent,
  },
  {
    path: 'add',
    component: AddEditEmployeesComponent
  },
  {
    path: 'edit/:id',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
