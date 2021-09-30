import { Log } from 'src/app/interfaces';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { Log } from '../interfaces';
import { LoginService } from '../services/login/login-service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})

export class LogoutComponent implements OnInit {
  router: any;
  UsersID : number;
   Log : Log
  
  
  focus(): void {
    throw new Error('Method not implemented.');
  }
  /**
   *
   * @param dialogRef {MatDialogRef<LogoutComponent>} this parameter controls the modal component and can call methods to close the modal
   */
  constructor(private dialogRef: MatDialogRef<LogoutComponent>,
    private Loginservice: LoginService
    ) { }

  ngOnInit(): void {
    
  }

  Confirm(): void {
    
    this.dialogRef.close(true);
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   console.log(obj.userId) 
   this.UsersID = obj.userId
     this.Loginservice.Logout(this.UsersID ).subscribe();
     window.localStorage.removeItem("user");
  }

  Cancel(){
    this.router.navigateByUrl('home');
  }

  // onNoClick(): void {
  //   this.dialogRef.close();
  // }

}
