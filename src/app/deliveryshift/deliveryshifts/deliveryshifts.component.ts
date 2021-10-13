import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';
import * as moment from 'moment';

@Component({
  selector: 'app-deliveryshifts',
  templateUrl: './deliveryshifts.component.html',
  styleUrls: ['./deliveryshifts.component.scss']
})
export class DeliveryshiftsComponent implements OnInit {

  //search code
  DeliveryShifts: Deliveryshift[];
  searchValue: number;
  searchWord: string;
  dataNotFound: boolean;
  userid: number;
  deliveryshift: Deliveryshift[] = [];
  // DeliveryShift: Deliveryshift;
  deliveryShift: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['startTime', 'endTime', 'dayOfTheWeek', 'employeeName', 'noOfDeliveries', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  now: number = +Date();


  constructor(private deliveryshiftService: DeliveryshiftService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.readDeliveryshifts();
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    this.userid = obj.userId
    this.deliveryshiftService.GetDeliveryShift().subscribe((result: Deliveryshift[]) => {
      this.setDeliveryShifts(result);
    });

  }

  canBeUpdated = (element) => {

    return +moment(element.dayOfTheWeek + ' ' + element.endTime, 'DD/MM/YYYY HH:mm:ss') > +moment()

  }

  setDeliveryShifts(result) {
    this.DeliveryShifts = result;
  }

  readDeliveryshifts(): void {

    this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }



  filter() {
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.startTime.includes(this.searchValue)))
    // // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.endTime.includes(this.searchValue)))
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.dayOfTheWeek.includes(this.searchValue)))
    setTimeout(() => this.dataSource.paginator = this.paginator);
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

  deleteDeliveryshift(Deliveryshift: any) {
    Deliveryshift.usersId = this.userid
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      console.log('delshift', Deliveryshift)
      if (res) {
        delete Deliveryshift.dayOfTheWeek
        this.deliveryshiftService.DeleteDeliveryShift(Deliveryshift).subscribe(res => {

          this.readDeliveryshifts();
          this.snack.open('Successfully Deleted Delivery Shift! ', 'OK',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 4000
            });
          // window.location.reload();
        }, (error: HttpErrorResponse) => {
          console.log(error.error, "test")
          if (error.status === 400) {
            this.snack.open(error.error, 'OK',
              {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 4000
              });
            return;
          }

        });
      }

    });

  }


}
