import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {

  focus(): void {
    throw new Error('Method not implemented.');
  }
  /**
   *
   * @param dialogRef {MatDialogRef<LogoutComponent>} this parameter controls the modal component and can call methods to close the modal
   */
  constructor(
    private dialogRef: MatDialogRef<LogoutComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

  Logout() {
    window.localStorage.removeItem("user");
    this.dialogRef.close();
    this.router.navigateByUrl('');
  }

  Cancel() {
    this.dialogRef.close();
  }

}
