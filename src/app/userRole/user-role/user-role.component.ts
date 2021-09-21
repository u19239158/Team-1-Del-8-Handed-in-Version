import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { UserRoleService } from 'src/app/services/user-role/user-role.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';
// {active: "name", direction: "asc"}

// 1. active:"name"
// 2. direction:"asc"
// 3. __proto__:Object

@Component({
  selector: 'app-user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss']
})
export class UserRoleComponent implements OnInit, AfterViewInit {

  //search code
  UserRoles: UserRole[];
  searchValue: string;
  dataNotFound: boolean;

  //userRoles: UserRole[] = [];
  UserRole: UserRole;
  userRoles: Observable<UserRole[]>;
  dataSource = new MatTableDataSource<UserRole>();
  displayedColumns: string[] = ['userRoleName', 'userRoleDescription', 'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private UserRoleService: UserRoleService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    // this.dataSource.paginator = this.paginator;

    this.readUserRoles();

    this.UserRoleService.GetUserRole().subscribe((result: UserRole[]) => {
      this.UserRoles = result;
    });

  }

  // sortColumn() {
  //   const sortColumn = (s) => {
  //     return s.userRoleName && s.userRoleName.MatSort()
  //     this.dataSource.sort = this.sort;
  //   }

  // }

  filter() {

    const filter = (e) => {

      return e.userRoleName && e.userRoleName.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.UserRoles.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  readUserRoles(): void {
    //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
    this.UserRoleService.GetUserRole().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
    })
  }

  deleteUserRole(UserRole: UserRole) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.UserRoleService.DeleteUserRole(UserRole).subscribe(res => {
          this.readUserRoles()
        })
      }
      this.snack.open('Successfully Deleted UserRole! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    });
  }
}

