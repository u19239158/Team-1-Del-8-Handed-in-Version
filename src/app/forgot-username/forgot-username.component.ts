import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  constructor(private dialogRef: MatDialogRef<ForgotUsernameComponent>) { }

  ngOnInit(): void {
  }

  
  Confirm(): void {
    window.localStorage.removeItem("user"); 
    this.dialogRef.close(true);
  }

  Cancel(): void {
    this.dialogRef.close();
  }

}
