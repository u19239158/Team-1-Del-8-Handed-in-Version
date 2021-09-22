import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-audittrail',
  templateUrl: './audittrail.component.html',
  styleUrls: ['./audittrail.component.scss']
})
export class AudittrailComponent implements OnInit {
  searchValue: string;
  dataNotFound: boolean;
  UserRoles: UserRole[];
  UserRole: UserRole;
  userRoles: Observable<UserRole[]>;
  dataSource = new MatTableDataSource<UserRole>();
  displayedColumns: string[] = ['userId', 'auditTrailDescription', 'auditTrailDate' ,'auditTrailTime'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private UserRoleService: UserRoleService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
    ) { }

  ngOnInit(): void {
    this.GetAuditTrail();

    
    this.UserRoleService.GetAuditTrail().subscribe((result: UserRole[]) => {
      this.UserRoles = result;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  filter() {

    const filter = (e) => {

      return e.auditTrailDescription && e.auditTrailDescription.toLowerCase().includes(this.searchValue.toLowerCase()) ||
       e.auditTrailDate && e.auditTrailDate.toLowerCase().includes(this.searchValue.toLowerCase()) 
     
    }
    const data = (this.UserRoles.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  GetAuditTrail(): void {
    //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
    this.UserRoleService.GetAuditTrail().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })

    
  }
}
