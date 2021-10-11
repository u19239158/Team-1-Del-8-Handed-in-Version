import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/login/authentication.service';
import { LogoutComponent } from 'src/app/logout/logout.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
 UsersID :Number;

  @Output() sidenavClose = new EventEmitter();

  constructor(
   private auth: AuthenticationService,
   private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    console.log(obj.userId)
    this.UsersID = obj.userId
    this.auth.Logout(this.UsersID).subscribe();
    window.localStorage.removeItem("user");
 
  }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout() {

    const logout = this.dialog.open(LogoutComponent, {
      disableClose: true
    });

   this.onSidenavClose();

  }
}
