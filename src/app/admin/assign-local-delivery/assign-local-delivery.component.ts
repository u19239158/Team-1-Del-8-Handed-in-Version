import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { HttpClient } from '@angular/common/http';

// import { GlobalErrorComponent } from 'src/app/modals/globals/global-error/global-error.component';

@Component({
  selector: 'app-assign-local-delivery',
  templateUrl: './assign-local-delivery.component.html',
  styleUrls: ['./assign-local-delivery.component.scss']
})
export class AssignLocalDeliveryComponent implements OnInit {

  //search code
  DeliveryShifts: Deliveryshift[];
  searchValue: number;
  searchWord: string;
  dataNotFound: boolean;

  deliveryshift: Deliveryshift[] = [];
  // DeliveryShift: Deliveryshift;
  deliveryShift: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  displayedColumns: string[] = ['startTime', 'endTime', 'dayOfTheWeek', 'employeeName', 'noOfDeliveries', 'SelectOrderDeliveryShift'];
  displayedColumn: string[] = ['saleId', 'customerName', 'customerBusinessName', 'deliverydistance', 'orderAddress', 'deliverycourier'];


  constructor(private deliveryshiftService: DeliveryshiftService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.readDeliveryshifts();

    this.deliveryshiftService.GetDeliveryShift().subscribe((result: Deliveryshift[]) => {
      this.DeliveryShifts = result;
    });

  }

  readDeliveryshifts(): void {
    this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  filter() {
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.startTime.includes(this.searchValue)))
    // // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.endTime.includes(this.searchValue)))
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.dayOfTheWeek.includes(this.searchValue)))

    const filter = (e) => {

      return e.employeeName && e.employeeName.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.startTime && e.startTime.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.endTime && e.endTime.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.dayOfTheWeek && e.dayOfTheWeek.toString().toLowerCase().includes(this.searchWord.toLowerCase())
    }
    const data = (this.DeliveryShifts.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)
  }

  // noSearchResults(Deliveryshift: Deliveryshift) {
  //   const confirm = this.dialog.open(GlobalErrorComponent, {
  //       disableClose: true,
  //   });

  //   confirm.afterClosed().subscribe(res => {
  //     if(res) {
  //       this.deliveryshiftService.DeleteDeliveryShift(Deliveryshift).subscribe(res => {
  //         this.readDeliveryshifts();
  //       });
  //     }
  //   });
  // }

  deleteDeliveryshift(Deliveryshift: Deliveryshift) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.deliveryshiftService.DeleteDeliveryShift(Deliveryshift).subscribe(res => {
          this.readDeliveryshifts();
        });
      }
    });
  }


}
