import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    // form: FormGroup;
    // formSubmitted: boolean = false;

    form : FormGroup = this.fb.group({
        'userUsername': ['', Validators.compose([Validators.required])],
        'userPassword': ['', Validators.compose([Validators.required])]
    });

    constructor(
        private fb: FormBuilder, 
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
    Login(): void 
    {
      this.AuthenticationService.Login(this.form.value).subscribe(res => {
        // route to home
        
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigateByUrl('/');
      }
      )}

    // onSubmit(loginForm) {
    //     this.formSubmitted = true;

    //     if (this.form.valid) {
    //         let username = this.form.controls['username'].value;
    //         let password = this.form.controls['password'].value;

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
}
