import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { LogoutComponent } from 'src/app/logout/logout.component';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  @ViewChild('logout') menuTrigger: LogoutComponent;

  constructor(private dialog: MatDialog,
              private router: Router,) { }

  ngOnInit(): void {
  }
  
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }


  Logout() {
    const dialogRef = this.dialog.open(LogoutComponent, {restoreFocus: false});
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    this.router.navigateByUrl('login');
    this.onSidenavClose();
  }
}
