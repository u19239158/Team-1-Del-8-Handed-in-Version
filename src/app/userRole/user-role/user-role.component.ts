import { Component, OnInit } from '@angular/core';
import { MatDialog}from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { UserRoleService } from 'src/app/services/user-role/user-role.service';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

//userRoles: UserRole[] = [];
UserRole: UserRole;
userRoles: Observable<UserRole[]>;
dataSource = new MatTableDataSource<UserRole>();
displayedColumns: string[] = ['name', 'description','actions'];

constructor(private UserRoleService: UserRoleService,
            private snack: MatSnackBar,
            private router: Router,
            private dialog: MatDialog) {}

ngOnInit(): void {
  this.readUserRoles();
}

readUserRoles(): void {
  //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
   this.UserRoleService.GetUserRole().subscribe(res => {
     console.log(res)
     this.dataSource = new MatTableDataSource(res)
   })
}

deleteUserRole(UserRole: UserRole) {
  const confirm = this.dialog.open(GlobalConfirmComponent, {
           disableClose: true,
          });

  confirm.afterClosed().subscribe(res => {
    if (res){
      this.UserRoleService.DeleteUserRole(UserRole).subscribe(res =>{
        this.readUserRoles()
      })
    }
  });
}

searchUserRole(){

}
}

