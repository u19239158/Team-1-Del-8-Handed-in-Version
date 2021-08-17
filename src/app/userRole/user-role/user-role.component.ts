import { Component, OnInit } from '@angular/core';
import { MatDialog}from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { UserRoleService } from 'src/app/services/user-role/user-role.service';
// import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit {

// //search code
// UserRoles: UserRole[];
// searchValue: string;

//userRoles: UserRole[] = [];
UserRole: UserRole;
userRoles: Observable<UserRole[]>;
dataSource = new MatTableDataSource<UserRole>();
displayedColumns: string[] = ['name', 'description','actions'];

constructor(private UserRoleService: UserRoleService,
            private snack: MatSnackBar,
            private router: Router,
            private dialog: MatDialog,
            // private httpClient: HttpClient
            ) {}

ngOnInit(): void {
  this.readUserRoles();

//   this.UserRoleService.GetUserRole().subscribe((result:UserRole[]) => {
//     this.UserRoles = result;
//   });
 }

// filter(){
//   this.dataSource = new MatTableDataSource (this.UserRoles.filter(e=>e.userRoleName.toLowerCase().includes(this.searchValue.toLowerCase())))
// }

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
}

