import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '../employee/add-edit-employees/must-match.validators';
import { LoginService } from '../services/login/login-service';

@Component({
  selector: 'app-forgot-username',
  templateUrl: './forgot-username.component.html',
  styleUrls: ['./forgot-username.component.scss']
})
export class ForgotUsernameComponent implements OnInit {
  /**
     *
     * @param dialogRef {MatDialogRef<LogoutComponent>} this parameter controls the modal component and can call methods to close the modal
     */

  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ForgotUsernameComponent>,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private log : LoginService
    ) {

  }

  ngOnInit(): void {

    const formOptions: AbstractControlOptions = { validators: MustMatch('userPassword', 'confirmNewPassword') };
    this.form = this.formBuilder.group({
      otp: ['', [Validators.minLength(6), Validators.required]],
      userPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmNewPassword: ['', [Validators.minLength(6), Validators.required]],

    }, formOptions);
  }

  Confirm(): void {
    // window.localStorage.removeItem("user");
    this.log.ResetPasswordOTP(this.form.value).subscribe( res => {})
    this.dialogRef.close();
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

