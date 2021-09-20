import { element } from 'protractor';
import { OnlineSales } from 'src/app/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, VERSION, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';
import { AbstractControlOptions, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ViewSaleComponent } from './view-sale/view-sale.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-online-sales',
  templateUrl: './online-sales.component.html',
  styleUrls: ['./online-sales.component.scss']
})

export class OnlineSalesComponent implements OnInit {
  onlineSale: OnlineSales;
  onlineSales: Observable<OnlineSales[]>;
  dataSource = new MatTableDataSource<OnlineSales>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['saleNumber', 'customer', 'business', 'saleDate', 'orderStatus', 'saleOrderRecieveType', 'actions'];
  OnlineSales: OnlineSales[];
  searchValue: number;
  searchWord: string;
  element: any;
  route: any;
  id: number;
  public sale: any = [];
  dataNotFound: boolean;

  constructor(private OnlineSalesService: OnlineSalesService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.readOnlineSales();

    this.OnlineSalesService.ViewAllSales().subscribe((result: OnlineSales[]) => {
      this.OnlineSales = result;
    })
  }

  click() {
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
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  updateToCollected(saleID: any) {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
    this.OnlineSalesService.GetSaleByID(saleID).subscribe(res => {
      this.sale = res;
      console.log(this.sale)
      this.OnlineSalesService.updateToCollected(this.sale).subscribe(res => {
        console.log(res)
      });
    });

    window.location.reload();

  }

  updateToDelivered(saleID: any) {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.OnlineSalesService.GetSaleByID(saleID).subscribe(res => {
      this.sale = res;
      console.log(this.sale)
      this.OnlineSalesService.updateToDelivered(this.sale).subscribe(res => {
        console.log(res)
      });
      window.location.reload();
    });

  }

  viewSale(saleID: any) {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
    this.OnlineSalesService.GetSaleByID(saleID).subscribe(res => {
      this.sale = res;
      console.log(this.sale)
      // this.OnlineSalesService.updateToCollected(this.sale).subscribe(res =>{
      //   console.log(res)});
    });

    const dialogRef = this.dialog.open(ViewSaleComponent, {
      data: { id: saleID },
      width: '400px',
    });
  }


  filter() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    const filter = (e) => {

      return e.customerName && e.customerName.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.customerSurname && e.customerSurname.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.customerBusinessName && e.customerBusinessName.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.saleOrderDate && e.saleOrderDate.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.orderStatusDescription && e.orderStatusDescription.toString().toLowerCase().includes(this.searchWord.toLowerCase())
    }
    const data = (this.OnlineSales.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)

  }

  parseInteger(value) {
    return parseInt(value)
  }

  Close() {
    this.router.navigateByUrl('/');
  }


  // openDialog(saleId): void {
  //   this.viewSale(saleId)
  //   const dialogRef = this.dialog.open(ViewSaleComponent, {
  //     width: '50%',
  //   });
  // }


}

// @Component({
//   selector: 'app-view-sale',
//   templateUrl: './online-sales.component.html',
//   styleUrls: ['./online-sales.component.scss']
// })
// export class ViewSaleComponent implements OnInit {
//   id: number;
//   sale: OnlineSales = {} as OnlineSales;
//   collection = [];
//   selected: string;
//   public sales: any = [];
//   form: FormGroup;
//   // id: number;
//   loading = false;
//   checked = false; labelPosition: 'before' | 'after' = 'after';
//   disabled = false;
//   isHidden: boolean = true;
//   saleOrderRecieveType: number;
//   dataSource = new MatTableDataSource<OnlineSales>();
//   // displayedColumns: string[] = ['itemsOrdered'];
//   onlineSale: OnlineSales;
//   onlineSales: Observable<OnlineSales[]>;
//   OnlineSales: OnlineSales[];
//   matVersion: string = '5.1.0';
//   breakpoint: number;

//   constructor(private OnlineSalesService: OnlineSalesService,
//     private route: ActivatedRoute,
//     private snack: MatSnackBar,
//     private router: Router,
//     private dialog: MatDialog,
//     private http: HttpClient,
//     private formBuilder: FormBuilder
//   ) { }

//   ngOnInit(): void {
//     this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;


//     const formOptions: AbstractControlOptions = {};
//     this.form = this.formBuilder.group({
//     }, formOptions)

//     this.id = this.route.snapshot.params['id'];
//     this.getCollection();

//     this.OnlineSalesService.ViewSale(this.id).subscribe(res => {
//       this.sale = res
//       console.log(res)

//       const formOptions: AbstractControlOptions = {};
//       this.form = this.formBuilder.group({
//       }, formOptions)

//     });
//   }

//   onResize(event) {
//     this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
//   }

//   getCollection() {
//     this.http
//       .get<any>('https://localhost:44393/api/Sale/ViewAllSales').subscribe((res: any) => {
//         this.sale = res.filter(sale => {
//           return sale.saleID == this.id;
//         })[0]
//         // console.log("check", this.sale)
//       }, error => {
//         console.log({ error });
//       })
//   }

//   PackOrder() {
//     const confirm = this.dialog.open(GlobalConfirmComponent, {
//       disableClose: true,
//     });
//     this.isHidden = false;

//     confirm.afterClosed().subscribe(res => {
//       if (res) {
//         this.router.navigateByUrl('onlineSales');
//         this.OnlineSalesService.GetSaleByID(this.id).subscribe(data => {
//           console.log(data)
//           if (data.saleOrderRecieveType == true) {
//             {
//               this.OnlineSalesService.GetSaleByID(this.id).subscribe(res => {
//                 this.sale = res;
//                 console.log(this.sale)
//                 this.OnlineSalesService.Collection(this.sale).subscribe(res => {
//                   console.log(res)
//                 });
//               });

//               this.snack.open('Order Successfully packed ', 'OK',
//                 {
//                   verticalPosition: 'bottom',
//                   horizontalPosition: 'center',
//                   duration: 4000
//                 });
//             }
//           }
//           else {
//             this.OnlineSalesService.GetSaleByID(this.id).subscribe(res => {
//               this.sale = res;
//               //console.log(this.sale)
//               this.OnlineSalesService.Delivery(this.sale).subscribe(res => {
//                 console.log(res)
//               });
//             })
//           }
//           if (data.orderStatusId != "1") {
//             (error: HttpErrorResponse) => {
//               console.log(error.error, "test")
//               if (error.status === 400) {
//                 this.snack.open(error.error, 'OK',
//                   {
//                     verticalPosition: 'bottom',
//                     horizontalPosition: 'center',
//                     duration: 3000
//                   });
//                 return;
//               }
//             }
//             //window.location.reload();
//           };
//         });
//       };

//       this.snack.open('Order Successfully packed ', 'OK',
//         {
//           verticalPosition: 'bottom',
//           horizontalPosition: 'center',
//           duration: 4000
//         });
//     })
//   }

//   Confirm() {
//     //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30

//   }

//   onSubmit() {

//     if (this.form.invalid) {
//       return;
//     }
//   }

//   Close() {
//     this.router.navigateByUrl('onlineSales');
//   }}



