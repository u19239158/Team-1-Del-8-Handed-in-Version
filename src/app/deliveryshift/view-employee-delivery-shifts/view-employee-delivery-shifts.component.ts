import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-view-employee-delivery-shifts',
  templateUrl: './view-employee-delivery-shifts.component.html',
  styleUrls: ['./view-employee-delivery-shifts.component.scss']
})
export class ViewEmployeeDeliveryShiftsComponent implements OnInit {

  //search code
  DeliveryShifts: Deliveryshift[];
  searchValue: number;
  searchWord: string;
  dataNotFound: boolean;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  deliveryshift: Deliveryshift[] = [];
  // DeliveryShift: Deliveryshift;
  deliveryShift: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  displayedColumns: string[] = ['employeeName', 'startTime', 'endTime', 'dayOfTheWeek', 'noOfDeliveries', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

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
    this.deliveryshiftService.GetDeliveryShiftDelivery().subscribe(res => {
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


}

