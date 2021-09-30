import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/logout/logout.component';
import { Login } from 'src/app/interfaces';
import { LoginService } from 'src/app/services/login/login-service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  userid: number;
  user: Login = {} as Login;
  @Output() sidenavClose = new EventEmitter();

  @ViewChild('logout') menuTrigger: LogoutComponent;

  constructor(private dialog: MatDialog,
    private router: Router,
    private log: LoginService,
  ) { }

  ngOnInit(): void {

    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    console.log(obj.userId)
    this.userid = obj.userId
    console.log(obj)

    this.log.GetUserByID(obj.userId).subscribe(res => {
      this.user = res
      console.log(res)
    });
  }
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }


  // Logout() {
  //   const dialogRef = this.dialog.open(LogoutComponent, {restoreFocus: false});
  //   dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  //   this.router.navigateByUrl('login');
  //   this.onSidenavClose();
  // }

  Logout() {

    const logout = this.dialog.open(LogoutComponent, {
      disableClose: true
    });

    // confirm.afterClosed().subscribe(res => {
    //   this.router.navigateByUrl('login');
    //   this.onSidenavClose();
    //     })

  }
}
