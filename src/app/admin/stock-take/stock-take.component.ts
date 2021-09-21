import { StockTakeService } from './../../services/admin/stock-take/stock-take.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StockTake , Productitem} from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.scss']
})

export class StockTakeComponent implements OnInit {
  ProductItems: Productitem[];
  searchItem: string;

  loading = false;
  submitted = false;
  isHidden: boolean = true;
  collection = [];
  selected: string;
  stockTakes: StockTake[] = [];
  StockTake: Observable<StockTake[]>;
  productitems: Productitem[] = [];
  productitem: Observable<Productitem[]>;
  dataSource = new MatTableDataSource<Productitem>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['productItem', 'quantity', 'actions'];
  productItemService: any;
 // StockTakeService: any;

  form = this.FB.group({
   // writtenOffStockDate: ['',Validators.required],
    categoryTypeId: ['',Validators.required]
  }) 
  Tableform;


  constructor(
    productItemService: ProductitemService,
    private stockTakeService: StockTakeService,
    private http: HttpClient,
    private router: Router,
    private FB:FormBuilder,
  ) { }

  // ngAfterViewInit(): void{
  //   setTimeout(() => this.dataSource.paginator = this.paginator);
  // }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.getCollection();

    const formOptions: AbstractControlOptions = { };
    this.Tableform = this.FB.group({
      categoryTypeDescription: ['', [Validators.required]],
      stockTakeDate: ['', [Validators.required]],
      stockTakeQuantity: ['', [Validators.required]],
      
      }, formOptions);
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

  getProductByCatType(id) {
   
  }


  // getProductByCatType(): void {
  //   this.StockTakeService.getProductByCatType().subscribe(res => {
  //     console.log(res)
  //     this.dataSource = new MatTableDataSource(res)
  //   })
  // }
  // showProducts(){
  //   this.isHidden = false;
  //}

  onClick(){

  }
  
    showProducts(){
      
      this.isHidden = false;
      this.stockTakeService.getProductByCatType(this.form.value.categoryTypeId).subscribe(res => {
        console.log(res)
       this.dataSource = new MatTableDataSource(res)
       setTimeout(() => this.dataSource.paginator = this.paginator);
      })
     ;
  
      // this.productItemService.getProductByCatType(this.ProductItems).subscribe((result => {
        
      // }));
    }
}
