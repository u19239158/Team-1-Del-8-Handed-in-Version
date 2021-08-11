import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
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

  // userRoles: UserRole[] = [];
  // dataSource = new MatTableDataSource<UserRole>();
  // displayedColumns: string[] = ['name', 'description','actions'];

  dataSaved = false;
  form: any;
  allUserRoles: Observable<UserRole[]>;
  userRoleIdUpdate = null;
  massage = null;

  constructor(private userRoleService: UserRoleService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadAllUserRoles();
  }

               loadAllUserRoles() {
                this.allUserRoles = this.userRoleService.getAllUserRole();
              }


              deleteUserRole(userRoleId: string) {
                if (confirm("Are you sure you want to delete this ?")) {
                  this.userRoleService.deleteUserRoleById(userRoleId).subscribe(() => {
                  this.dataSaved = true;
                  this.massage = 'Record Deleted Succefully';
                  this.loadAllUserRoles();
                  this.userRoleIdUpdate = null;


                });
              }
            }
//   ngOnInit(): void {
//     this.readUserRoles();
//   }

//   readUserRoles(): void {
//     this.dataSource = new MatTableDataSource<UserRole>(this.userRoleService.getAll());
//   }

//   deleteUserRole(inUserRole: UserRole) {
//     const confirm = this.dialog.open(GlobalConfirmComponent, {
//         disableClose: true,
//     });

//     confirm.afterClosed().subscribe(res => {
//       if(res) {
//         this.userRoleService.deleteUserRole(inUserRole);
//         this.readUserRoles();
//       }
//     });
//   }
//
          }
