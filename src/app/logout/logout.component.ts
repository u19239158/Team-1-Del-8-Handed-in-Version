import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor( private dialogRef: MatDialogRef<LogoutComponent>,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  Logout() {

    this.dialogRef.close(true);
    this.router.navigateByUrl('');
  }

  Cancel() {
    this.dialogRef.close();
  }

}
