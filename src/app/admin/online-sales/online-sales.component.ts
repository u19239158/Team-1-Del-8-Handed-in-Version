import { element } from 'protractor';
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
  selector: 'app-online-sales',
  templateUrl: './online-sales.component.html',
  styleUrls: ['./online-sales.component.scss']
})

export class OnlineSalesComponent implements OnInit {
  onlineSale: OnlineSales;
  onlineSales: Observable<OnlineSales[]>;
  dataSource = new MatTableDataSource<OnlineSales>();
  displayedColumns: string[] = ['saleNumber', 'customer', 'business', 'saleDate', 'orderStatus', 'actions'];
  OnlineSales: OnlineSales[];
  searchValue: number;
  searchWord: string;
  element: any;
  route: any;
  id: number;
public sale : any =[];

  constructor(private OnlineSalesService: OnlineSalesService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

ngOnInit(): void {
  this.readOnlineSales();
 
  this.OnlineSalesService.ViewAllSales().subscribe((result:OnlineSales[])=> {
    this.OnlineSales = result;
  })
}

click(){
  //this.id = +this.element['saleID'];
  
  // this.OnlineSalesService.GetSaleByID(this.id).subscribe(res => {
  //   this.onlineSale = res
  //   console.log(res)})
 }

readOnlineSales(): void {
  //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
   this.OnlineSalesService.ViewAllSales().subscribe(res => {
     console.log(res)
     this.dataSource = new MatTableDataSource(res)
   })
}

updateToCollected(saleID: any) {
  //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
this.OnlineSalesService.GetSaleByID(saleID).subscribe(res=>{
  this.sale =res;
  console.log(this.sale)
  this.OnlineSalesService.updateToCollected(this.sale).subscribe(res =>{
    console.log(res)});
});
  
   window.location.reload();

}

updateToDelivered(saleID: any) {
  this.OnlineSalesService.GetSaleByID(saleID).subscribe(res=>{
    this.sale =res;
    console.log(this.sale)
    this.OnlineSalesService.updateToDelivered(this.sale).subscribe(res =>{
      console.log(res)});
      window.location.reload();
  });

}

viewSale(saleID: any) {
  //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
this.OnlineSalesService.GetSaleByID(saleID).subscribe(res=>{
  this.sale =res;
  console.log(this.sale)
  // this.OnlineSalesService.updateToCollected(this.sale).subscribe(res =>{
  //   console.log(res)});
});}


filter() {
  const filter = (e) => {

      return e.customerName && e.customerName.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.customerSurname && e.customerSurname.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.customerBusinessName && e.customerBusinessName.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.saleOrderDate && e.saleOrderDate.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.orderStatusDescription && e.orderStatusDescription.toString().toLowerCase().includes(this.searchWord.toLowerCase())
    }

    this.dataSource = new MatTableDataSource(this.OnlineSales.filter(filter))
  }

  parseInteger(value) {
    return parseInt(value)
  }

  Close() {
    this.router.navigateByUrl('/');
  }
}
