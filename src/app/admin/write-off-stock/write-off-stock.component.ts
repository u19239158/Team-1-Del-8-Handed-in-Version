import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Productitem, WriteOffStock,Categorytype } from 'src/app/interfaces';
import { WriteOffStockService } from 'src/app/services/admin/write-off-stock/write-off-stock.service';
import { Observable } from 'rxjs';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import {MatPaginator} from '@angular/material/paginator';


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
  productitems: Productitem[] = [];
  productitem: Observable<Productitem[]>;
  dataSource = new MatTableDataSource<Productitem>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['productItem', 'quantity', 'actions'];
  productItemService: any;

  form = this.FB.group({
    writtenOffStockDate: ['',Validators.required],
    categoryTypeId: ['',Validators.required]
  }) 
  Tableform;
 

  constructor(
    productItemService: ProductitemService,
    private writeOffStockService: WriteOffStockService,
    private http: HttpClient,
    private router: Router,
    private FB:FormBuilder,
  ) { }

  
  ngOnInit(): void {
    this.getCollection();
    
    const formOptions: AbstractControlOptions = { };
    this.Tableform = this.FB.group({
      categoryTypeDescription: ['', [Validators.required]],
      writeOffReason: ['', [Validators.required]],
      writtenOffStockDate: ['', [Validators.required]],
      writeOffQuantity: ['', [Validators.required]],
      
      }, formOptions);
  }

  // getProductItemByCategoryType() : void {
  //   this.isHidden = false;

  //   this.productItemService.GetProductItem().subscribe(res => {
  //   console.log(res)
    
  //   this.dataSource = new MatTableDataSource(res.filter(e=>e.productItemName.toLowerCase().includes(this.searchItem.toLowerCase())))
  //    })

  //   this.dataSource = new MatTableDataSource (this.ProductItems.filter(e=>e.productItemName.toLowerCase().includes(this.searchItem.toLowerCase())))
  // }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/CategoryType/GetCategoryType').subscribe((res: any) => {
        this.collection = res;
        //console.log = res;
      }, error => {
        console.log({ error });
      })
  }

  getProductByCatType(id) {
   
  }

//   readWriteOff(): void {
//     this.WriteOffStockService.getWriteOff().subscribe(res => {
//       console.log(res)
//       //this.dataSource = new MatTableDataSource(res)
//     })
//    //this.dataSource = new MatTableDataSource<Categorytype>(this.categorytypeService.getAll());
//  }

onClick(){

}

  showProducts(){
    
    this.isHidden = false;
    this.writeOffStockService.getProductByCatType(this.form.value.categoryTypeId).subscribe(res => {
      console.log(res)
     this.dataSource = new MatTableDataSource(res)
     setTimeout(() => this.dataSource.paginator = this.paginator);
    })
   ;

    // this.productItemService.getProductByCatType(this.ProductItems).subscribe((result => {
      
    // }));
  }

}
