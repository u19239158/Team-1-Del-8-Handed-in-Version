import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from './must-match.validators';


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
    private formGroup: FormGroup,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,) {

  }

  ngOnInit(): void {

    const formOptions: AbstractControlOptions = { validators: MustMatch('newPassword', 'confirmNewPassword') };
    this.form = this.formBuilder.group({
      otp: ['', [Validators.minLength(6), Validators.required]],
      newPassword: ['', [Validators.minLength(6), Validators.required]],
      confirmNewPassword: ['', [Validators.minLength(6), Validators.required]],

    }, formOptions);
  }

  Confirm(): void {
    // window.localStorage.removeItem("user");
    this.dialogRef.close();
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

