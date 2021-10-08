import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    form: FormGroup;
    formSubmitted: boolean = false;

    constructor(private fb: FormBuilder,
         private authenticationService: AuthenticationService,
        private snack: MatSnackBar,
        private router: Router,
        ) { }

    ngOnInit() {
        this.form = this.fb.group({
            'username': ['', Validators.compose([Validators.required])],
            'name': ['', Validators.compose([Validators.required])],
            'surname': ['', Validators.compose([Validators.required])],
            'cellnumber': ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
            'email': ['', [Validators.required, Validators.email]],
            'vat': ['', [Validators.minLength(10), Validators.maxLength(10)]],
            'businessname': ['', [Validators.maxLength(50)]],
            'password': ['', [Validators.minLength(6), Validators.required]],
            'confirmpassword': ['', Validators.compose([Validators.required])],
        });
    }

    onSubmit(registerForm) {
        this.formSubmitted = true;

        if (this.form.valid) {
            let username = this.form.controls['username'].value;
            let name = this.form.controls['name'].value;
            let surname = this.form.controls['username'].value;
            let cellnumber = this.form.controls['cellnumber'].value;
            let email = this.form.controls['email'].value;
            let vat = this.form.controls['vat'].value;
            let businessname = this.form.controls['businessname'].value;
            let password = this.form.controls['password'].value;
            let confirmpassword = this.form.controls['confirmpassword'].value;


            let newuser$ = this.authenticationService.register(username, name, surname, cellnumber, vat, businessname, email, password, confirmpassword);

            newuser$.subscribe(
                (data: any) => console.log(data),
                err => console.error(err)
                
            ), this.snack.open('Succesfully registered. Please Login ', 'OK', 
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 4000
            });;
            this.router.navigateByUrl('login')
        } else {
            console.log("The form is not valid");
            this.formSubmitted = false;
        }
    }
}
