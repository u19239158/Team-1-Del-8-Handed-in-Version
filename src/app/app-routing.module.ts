import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddEditEmployeesComponent } from './pages/add-edit-employees/add-edit-employees.component';
import { EmployeesComponent } from './pages/employees/employees.component';

/**
 * This array specifies your routes array. The paths are matched with certain components,
 * if the path matches a component, that component will be displayed on your browser as the current page.
 * Notice how add and edit call the same component, but edit takes in a parameter that will influence if
 * the AddEditUsersComponent will be in add mode or in update mode. See the component for more.
 */
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
