import { OnlineSales, Deliveryshift } from 'src/app/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';

@Component({
  selector: 'app-view-delivery-details',
  templateUrl: './view-delivery-details.component.html',
  styleUrls: ['./view-delivery-details.component.scss']
})
export class ViewDeliveryDetailsComponent implements OnInit {

  id: number;
  dshift: Deliveryshift = {} as Deliveryshift;
  collection = [];
  selected: string;
  public sales: any = [];
  // id: number;
  loading = false;
  matVersion: string = '5.1.0';
  breakpoint: number;

  constructor(private OnlineSalesService: OnlineSalesService,
    private deliveryshiftService: DeliveryshiftService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,) { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;

    this.id = this.route.snapshot.params['id'];
    //this.getCollection();

    this.deliveryshiftService.GetAssigned(this.id).subscribe(res => {
      if (res){
      this.dshift = res
      console.log(res),
      (error: HttpErrorResponse) =>
      {
        console.log(error.error,"test")
       if (error.status === 400)
      {
        this.snack.open(error.error, 'OK', 
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
        return;
      }}
    }});
  }

  // getCollection() {
  //   this.http
  //     .get<any>('https://localhost:44393/api/Sale/ViewAllSales').subscribe((res: any) => {
  //       this.dshift = res.filter(sale => {
  //         return sale.saleID == this.id;
  //       })[0]
  //       // console.log("check", this.sale)
  //     }, error => {
  //       console.log({ error });
  //     })
  // }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  Close() {
    this.router.navigateByUrl('viewDeliveryShiftSchedule');
  }

}
