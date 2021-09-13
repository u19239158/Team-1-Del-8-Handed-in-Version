import { InterceptorServiceService } from './../services/interceptor-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import { AuthenticationService } from './authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login/login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form : FormGroup = this.fb.group({
    'userUsername': ['', Validators.compose([Validators.required])],
    'userPassword': ['', Validators.compose([Validators.required])]
});

   // form: FormGroup;
   // formSubmitted: boolean = false;
  
    constructor(
      private fb: FormBuilder, 
      private router: Router, 
      private dialog: MatDialog,
      private Loginservice: LoginService, 
      private snack: MatSnackBar,
      private InterceptorServiceService: InterceptorServiceService
      ) { }

      

    ngOnInit() : void {
       
    }

  //  onSubmit(loginForm) {
        // this.formSubmitted = true;

        // if (this.form.valid) {
        //     let username = this.form.controls['username'].value;
        //     let password = this.form.controls['password'].value;

        //     let user$ = this.InterceptorServiceService.Login(username, password);

        //     user$.subscribe(
        //         (data: any) => console.log(data),
        //         err => console.error(err)
        //     );
        // } else {
        //     console.log("The form is NOT valid");
        //     this.formSubmitted = false;
        // }

        Login(): void 
        {
          this.Loginservice.Login(this.form.value).subscribe(res => {
            // route to home
            
            localStorage.setItem('user', JSON.stringify(res));
            this.router.navigateByUrl('/');
          }
          )}
          // (error: HttpErrorResponse) => 
          // {
      
          //   if (error.status === 404)
          //   {
          //     this.snack.open('Invalid credentials.', 'OK', 
          //     {
          //       verticalPosition: 'bottom',
          //       horizontalPosition: 'center',
          //       duration: 3000
          //     });
             
          //     this.form.reset();
          //     return;
          //   }

            // this.snack.open('An error occured on our servers. Try again later.', 'OK',
            // {
            //   verticalPosition: 'bottom',
            //   horizontalPosition: 'center',
            //   duration: 3000
            // });
          //   this.form.reset();
          // });
        //}
}