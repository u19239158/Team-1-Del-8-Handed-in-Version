import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material/material.module';
import { GlobalErrorComponent } from './modals/globals/global-error/global-error.component';
import { GlobalConfirmComponent } from './modals/globals/global-confirm/global-confirm.component';
import { ProductsComponent } from './pages/products/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { PromotionsComponent } from './pages/promotions/promotions.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FilterPipe } from './services/service/filter.pipe';
import { EditCustProfileComponent } from './pages/edit-cust-profile/edit-cust-profile.component';
import { NewregisterComponent } from './pages/newregister/newregister.component';
// import { MatFormFieldModule } from '@angular/material/form-field/form-field-module';
import { ForgotUsernameComponent } from './forgot-username/forgot-username.component';
import { LearnMoreComponent } from './pages/learn-more/learn-more.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    GlobalErrorComponent,
    GlobalConfirmComponent,
    ProductsComponent,
    CartComponent,
    HeaderComponent,
    SidenavListComponent,
    PromotionsComponent,
    FilterPipe,
    EditCustProfileComponent,
    //GoogleMapsComponent,
    NewregisterComponent,
    ForgotUsernameComponent,
    LearnMoreComponent,
    LogoutComponent

  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    MaterialModule,
    NgbModule,
    MatDialogModule,
    MatInputModule,
    // MatFormFieldModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDqVP00cbOxrgdmqsSZ591CfwyjRZstNfM',
    //   libraries: ['places']
    // })

  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
      hideRequired: false,
      floatLabel: 'auto',
    });
  }
}



















