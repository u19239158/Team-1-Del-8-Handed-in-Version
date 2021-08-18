import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Productitem, WriteOffStock } from 'src/app/interfaces';
import { WriteOffStockService } from 'src/app/services/admin/write-off-stock/write-off-stock.service';
import { Observable } from 'rxjs';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';

@Component({
  selector: 'app-write-off-stock',
  templateUrl: './write-off-stock.component.html',
  styleUrls: ['./write-off-stock.component.scss']
})

export class WriteOffStockComponent implements OnInit {
  //search code
ProductItems: Productitem[];
searchItem: string;
  
  loading = false;
  submitted = false;
  isHidden: boolean = true;
  collection = [];
  selected: string;
  writeOffStocks: WriteOffStock[] = [];
  writeOffStock: Observable<WriteOffStock[]>;
  dataSource = new MatTableDataSource<WriteOffStock>();
  displayedColumns: string[] = ['productItem', 'quantity', 'reason'];
  productItemService: any;

  constructor(
    productItemService: ProductitemService,
    writeOffStockService: WriteOffStockService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCollection();
    this.getProductItemByCategoryType();

    this.productItemService.GetProductItem().subscribe((result:Productitem[]) => {
      this.ProductItems = result;
    });
  }

  getProductItemByCategoryType() : void {
    this.isHidden = false;

    this.productItemService.GetProductItem().subscribe(res => {
    console.log(res)
    
    this.dataSource = new MatTableDataSource(res.filter(e=>e.productItemName.toLowerCase().includes(this.searchItem.toLowerCase())))
     })

    //this.dataSource = new MatTableDataSource (this.ProductItems.filter(e=>e.productItemName.toLowerCase().includes(this.searchItem.toLowerCase())))
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/CategoryType/GetCategoryType').subscribe((res: any) => {
        this.collection = res;
        //console.log = res;
      }, error => {
        console.log({ error });
      })
  }

  // showProducts(){
  //   this.isHidden = false;
  // }

}
