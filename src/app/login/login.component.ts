import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgotUsernameComponent } from '../forgot-username/forgot-username.component';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // form: FormGroup;
  // formSubmitted: boolean = false;

  form: FormGroup = this.fb.group({
    'userUsername': ['', Validators.compose([Validators.required])],
    'userPassword': ['', Validators.compose([Validators.required])]
  });

  constructor(
    private fb: FormBuilder,
    private _location: Location,
    private router: Router,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private AuthenticationService: AuthenticationService,
  ) { }


  ngOnInit() {
    // this.form = this.fb.group({
    //     'username': ['', Validators.compose([Validators.required])],
    //     'password': ['', Validators.compose([Validators.required])]
    // });
  }
  // Login(): void {
  //   this.AuthenticationService.Login(this.form.value).subscribe(res => {
  //     // route to home

  //     localStorage.setItem('user', JSON.stringify(res));
  //     this.router.navigateByUrl('/');
  //   }
    Login(): void 
    {
      this.AuthenticationService.Login(this.form.value).subscribe(res => {
        // route to home
        
        localStorage.setItem('user', JSON.stringify(res));
        
        // let auth= localStorage.getItem('user')
        // let authy = JSON.parse(auth);
        // localStorage.setItem('addressAuth',authy.auth);

        this.router.navigateByUrl('/');
      },(error: HttpErrorResponse)=>
      {
      if (error.status === 400)
        {
          this.snack.open(error.error, 'OK',
          {
            verticalPosition: 'top',
            horizontalPosition: 'center',
              duration: 4000
          });
      }}
      )}
      
      backClicked() {
        this._location.back();
      }

  //         let user$ = this.authenticationService.Login(username, password);

  //         user$.subscribe(
  //             (data: any) => console.log(data),
  //             err => console.error(err)
  //         );
  //     } else {
  //         console.log("The form is NOT valid");
  //         this.formSubmitted = false;
  //     }
  // }

  forgotPassword(): void {
    this.AuthenticationService.ResetPassword(this.form.value).subscribe(res =>{
      const confirm = this.dialog.open(ForgotUsernameComponent, {
        disableClose: true,
      });
  
      confirm.afterClosed().subscribe(res => {
        this.router.navigateByUrl('login');
      })
    }
     , (error: HttpErrorResponse) => {
            console.log(error.error, "test")
            if (error.status === 400) {
              this.snack.open(error.error, 'OK',
                {
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  duration: 4000
                });
              return;
            }
          }),
          localStorage.setItem('username' ,this.form.value.userUsername)
  }

}
