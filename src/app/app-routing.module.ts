import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { HomeComponent } from './pages/home/home.component';
import { CustomersComponent } from './pages/customerProfile/customers.component';

const routes: Routes = [
  { 
    path: '', pathMatch: 'full', redirectTo: 'home' 
  },
  { 
    path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) 
  },
  { 
    path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) 
  },
  { 
    path: 'register', loadChildren: () => import('./pages/register/register.module').then(m => m.RegisterModule) 
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'promotions',
    component: PromotionsComponent
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'customer',
    component: CustomersComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
