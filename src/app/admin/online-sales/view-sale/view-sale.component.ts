import { OnlineSales } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.scss']
})

// productItemName: string;
//   //productItemDescription:string;
//   productItemCost: number;
//   quantityOnHand: number;

// onlineSale: OnlineSales;
// onlineSales: Observable<OnlineSales[]>;
// dataSource = new MatTableDataSource<OnlineSales>();
// displayedColumns: string[] = ['productItemName','quantityOnHand'];
// OnlineSales: OnlineSales[];

export class ViewSaleComponent implements OnInit {

  constructor(private OnlineSalesService: OnlineSalesService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
    ) {}

    
  ngOnInit(): void {
    // this.readOnlineSales();
    
  }

  // readOnlineSales(): void {
  // //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
  //  this.OnlineSalesService.ViewAllSales().subscribe(res => {
  //    console.log(res)
  //    this.dataSource = new MatTableDataSource(res)
  //  })
// }

  Close(){
    this.router.navigateByUrl('/');
  }

}
