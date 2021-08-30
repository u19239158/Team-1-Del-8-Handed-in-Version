import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';


export const routes = [
    { path: '', component: RegisterComponent }
];


@NgModule({
  declarations: [RegisterComponent],
  imports: [
      CommonModule,
      FlexLayoutModule,
      MatIconModule,
      MatInputModule,
      MatButtonModule,
      ReactiveFormsModule,
      RouterModule.forChild(routes)
  ]
})
export class RegisterModule { }
