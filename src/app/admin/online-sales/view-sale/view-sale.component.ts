import { OnlineSales } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';
enum CheckBoxType { READY_FOR_COLLECTION, READY_FOR_DELIVERY, NONE };
import { AbstractControlOptions, FormGroup, FormBuilder } from '@angular/forms';

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
  id: number;
  sale: OnlineSales = {} as OnlineSales;
  collection = [];
  selected: string;
  public sales: any = [];
  form: FormGroup;
  // id: number;
  loading = false;
  checked = false; labelPosition: 'before' | 'after' = 'after';
  disabled = false;
  isHidden: boolean = true;
  

  constructor(private OnlineSalesService: OnlineSalesService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
    }, formOptions)
   
    this.id = this.route.snapshot.params['id'];
    this.getCollection();

    this.OnlineSalesService.ViewSale(this.id).subscribe(res => {
      this.sale = res
      console.log(res)

      const formOptions: AbstractControlOptions = {};
      this.form = this.formBuilder.group({
      }, formOptions)

    });
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/Sale/ViewAllSales').subscribe((res: any) => {
        this.sale = res.filter(sale => {
          return sale.saleID == this.id;
        })[0]
        // console.log("check", this.sale)
      }, error => {
        console.log({ error });
      })
  }

  PackOrder() {
    //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
    // this.OnlineSalesService.GetSaleByID(saleID).subscribe(res=>{
    //   this.sale =res;
    //   console.log(this.sales)
    this.isHidden = false;

    this.OnlineSalesService.GetSaleByID(this.id).subscribe(data => {
      console.log(data)
      // this.OnlineSalesService.updateToCollected(this.sale).subscribe(res =>{
      //   console.log(res)});
    });
  }

  // showProducts(){
  //   this.isHidden = false;
  //   this.writeOffStockService.getProductByCatType(this.form.value.categoryTypeId).subscribe(res => {
  //     console.log(res)
  //    this.dataSource = new MatTableDataSource(res)
  //   })
  //  ;


  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;

  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.currentlyChecked === targetType) {
      this.currentlyChecked = CheckBoxType.NONE;
      return;
    }

    this.currentlyChecked = targetType;
  }

  Collection()
  {
    this.OnlineSalesService.GetSaleByID(this.id).subscribe(res => {
      this.sale = res;
      console.log(this.sale)
      this.OnlineSalesService.Collection(this.sale).subscribe(res => {
        console.log(res)
      });
    });

    this.OnlineSalesService.GetCustomerBySaleID(this.id).subscribe(data=>{
      this.sales = data
      console.log(data) 
      this.OnlineSalesService.NotifyCustomer(this.sales, this.sales.customerEmailAddress).subscribe(res => {
        console.log(res)
      });
   });
  }


  Delivery()
  {
    this.OnlineSalesService.GetSaleByID(this.id).subscribe(res=>{
      this.sale =res;
      console.log(this.sale)
      this.OnlineSalesService.Delivery(this.sale).subscribe(res =>{
        console.log(res)});
    });
  }
  
  
  Confirm() {
    //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
 
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
  }

  Close() {
    this.router.navigateByUrl('onlineSales');
  }

}

