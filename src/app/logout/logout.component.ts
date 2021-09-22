import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {
  router: any;
  focus(): void {
    throw new Error('Method not implemented.');
  }
  /**
   *
   * @param dialogRef {MatDialogRef<LogoutComponent>} this parameter controls the modal component and can call methods to close the modal
   */
  constructor(private dialogRef: MatDialogRef<LogoutComponent>) { }

  ngOnInit(): void {
  }

  Confirm(): void {
    window.localStorage.removeItem("user");
    this.dialogRef.close(true);
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
