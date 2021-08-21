//import { OrderStatus } from './../../interfaces/index';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineSales } from 'src/app/interfaces';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';

@Component({
  selector: 'app-search-online-sales',
  templateUrl: './search-online-sales.component.html',
  styleUrls: ['./search-online-sales.component.scss']
})
export class SearchOnlineSalesComponent implements OnInit {
  form: FormGroup;
  id : number;
  loading = false;
  isHidden: boolean = true;
  collection = [];
  selected: string;
  dataSource = new MatTableDataSource<OnlineSales>();
  displayedColumns: string[] = ['saleNumber', 'saleDate','orderStatus','actions'];
  OnlineSalesService: any;
  OnlineSales : OnlineSales[];
  onlineSales : OnlineSales;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private http: HttpClient,
    //private WriteOffStockService : WriteOffStockService,
    //private FormBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCollection();
  //  this.SearchSales();

    
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/OrderStatus/GetOrderStatus').subscribe((res: any) => {
        this.collection = res;
        console.log(res);
      }, error => {
        console.log({ error });
      })
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
    this.OnlineSalesService.SearchSales().subscribe((result:OnlineSales[])=> {
      this.OnlineSales = result; })
  }

  Search(){
    this.isHidden = false;
  }
  Close() {
    this.form.reset();
    this.router.navigateByUrl('onlineSales');
  }

  SearchSales(): void {
    const searchSale: OnlineSales = this.form.value;
    searchSale.orderStatusId = this.onlineSales.orderStatusId;
    //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
     this.OnlineSalesService.SearchSales().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
    }

}
