import { OnlineSales } from 'src/app/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';
// enum CheckBoxType { READY_FOR_COLLECTION, READY_FOR_DELIVERY, NONE };
import { AbstractControlOptions, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { element } from 'protractor';

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
  saleOrderRecieveType: number;
  dataSource = new MatTableDataSource<OnlineSales>();
  // displayedColumns: string[] = ['itemsOrdered'];
  onlineSale: OnlineSales;
  onlineSales: Observable<OnlineSales[]>;
  OnlineSales: OnlineSales[];
  matVersion: string = '5.1.0';
  breakpoint: number;


  constructor(private OnlineSalesService: OnlineSalesService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ViewSaleComponent>,

    @Inject(MAT_DIALOG_DATA) public data: any

  ) { }


  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;


    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
    }, formOptions)

    this.id = this.data.id;
    this.getCollection();

    this.OnlineSalesService.ViewSaleboo(this.id).subscribe(res => {
      this.sale = res
      console.log(res)


      const formOptions: AbstractControlOptions = {};
      this.form = this.formBuilder.group({
      }, formOptions)

    });
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
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
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });
    this.isHidden = false;

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.router.navigateByUrl('onlineSales');
        this.OnlineSalesService.GetSaleByID(this.id).subscribe(data => {
          console.log(data)
          if (data.saleOrderRecieveType == true) {
            {
              this.OnlineSalesService.CollectionSMS(this.sale). subscribe (data => {})


              this.OnlineSalesService.GetSaleByID(this.id).subscribe(res => {
                this.sale = res;
                console.log(this.sale)
                this.OnlineSalesService.Collection(this.sale).subscribe(res => {
                  console.log(res)
                  this.snack.open('Order Successfully packed ', 'OK',
                  {
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    duration: 4000
                  });
                });
              });

            }
          }
          else {
            this.OnlineSalesService.GetSaleByID(this.id).subscribe(res => {
              this.sale = res;
              //console.log(this.sale)
              this.OnlineSalesService.Delivery(this.sale).subscribe(res => {
                console.log(res)
                this.snack.open('Order Successfully packed ', 'OK',
                {
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  duration: 4000
                });
              });
            })
          }
          if (data.orderStatusId != "1") {
            (error: HttpErrorResponse) => {
              console.log(error.error, "test")
              if (error.status === 400) {
                this.snack.open(error.error, 'OK',
                  {
                    verticalPosition: 'top',
                    horizontalPosition: 'center',
                    duration: 3000
                  });
                return;
              }
            }
            //window.location.reload();
          };
        });
      };

    
    })
  }

  closeDialog = () => {
    this.dialogRef.close();
  }

  // check_box_type = CheckBoxType;
  // currentlyChecked: CheckBoxType;

  // selectCheckBox(targetType: CheckBoxType) {
  //   // If the checkbox was already checked, clear the currentlyChecked variable
  //   if (this.currentlyChecked === targetType) {
  //     this.currentlyChecked = CheckBoxType.NONE;
  //     return;
  //   }

  //   this.currentlyChecked = targetType;
  // }









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

