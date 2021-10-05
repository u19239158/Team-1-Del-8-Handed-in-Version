import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthenticationService } from 'src/app/login/authentication.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
 UsersID :Number;

  @Output() sidenavClose = new EventEmitter();

  constructor(
   private auth: AuthenticationService
  ) { }

  ngOnInit(): void {
  }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  logout(){
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    console.log(obj.userId)
    this.UsersID = obj.userId
    this.auth.Logout(this.UsersID).subscribe();
    window.localStorage.removeItem("user");
  }
}
