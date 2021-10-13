import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthenticationService } from '../login/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  UsersID :Number;
  constructor( private dialogRef: MatDialogRef<LogoutComponent>, private auth: AuthenticationService, private snack: MatSnackBar,
    private router: Router,
    ) { }

  ngOnInit(): void {
  }

  Logout() {
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    console.log(obj.userId)
    this.UsersID = obj.userId
    this.auth.Logout(this.UsersID).subscribe();
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
    this.dialogRef.close(true);
    this.router.navigateByUrl('');

    this.snack.open('Successfully Logged out!', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
          duration: 4000
      });
  
  }
      

  Cancel() {
    this.dialogRef.close();
  }

}
