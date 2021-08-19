import { OnlineSales } from './../../interfaces/index';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';

@Component({
  selector: 'app-online-sales',
  templateUrl: './online-sales.component.html',
  styleUrls: ['./online-sales.component.scss']
})
export class OnlineSalesComponent implements OnInit {

//userRoles: UserRole[] = [];
onlineSale: OnlineSales;
onlineSales: Observable<OnlineSales[]>;
dataSource = new MatTableDataSource<OnlineSales>();
displayedColumns: string[] = ['saleNumber', 'saleDate','orderStatus','actions'];
OnlineSales: OnlineSales[];

constructor(private OnlineSalesService: OnlineSalesService,
            private snack: MatSnackBar,
            private router: Router,
            private dialog: MatDialog,
            private httpClient: HttpClient
            ) {}

ngOnInit(): void {
  this.readOnlineSales();

  this.OnlineSalesService.GetOnlineSales().subscribe((result:OnlineSales[])=> {
    this.OnlineSales = result;
  })
}

readOnlineSales(): void {
  //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
   this.OnlineSalesService.GetOnlineSales().subscribe(res => {
     console.log(res)
     this.dataSource = new MatTableDataSource(res)
   })
}

Close(){
  this.router.navigateByUrl('/');
}
}
