import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { DeliveryAssignedComponent } from 'src/app/modals/globals/delivery-assigned/delivery-assigned.component';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { HttpClient } from '@angular/common/http';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import {MatPaginator} from '@angular/material/paginator';

enum CheckBoxType { ASSIGN_SHIFT, NONE };

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
  id: number;
  deliveryshift: Deliveryshift[] = [];
  public sales: any = [];
  public delivery: any = [];
  public emp: any = [];
  // DeliveryShift: Deliveryshift;
  deliveryShift: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['startTime', 'endTime', 'dayOfTheWeek', 'employeeName', 'noOfDeliveries', 'SelectOrderDeliveryShift'];
  displayedColumn: string[] = ['saleId', 'customerName', 'customerBusinessName', 'deliverydistance', 'orderAddress', 'deliverycourier'];


  constructor(private deliveryshiftService: DeliveryshiftService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.id = +this.route.snapshot.params['id'];
    this.readDeliveryshifts();


    this.deliveryshiftService.GetSaleByID(this.id).subscribe(res => {
      this.sales = res;
      console.log("Result", this.sales)
    });

    this.deliveryshiftService.GetDeliveryShift().subscribe((result: Deliveryshift[]) => {
      this.DeliveryShifts = result;
    });

  }

  check_box_type = CheckBoxType;
  currentlyChecked: CheckBoxType;

  selectCheckBox(targetType: CheckBoxType) {
    // If the checkbox was already checked, clear the currentlyChecked variable
    if (this.currentlyChecked === targetType) {
      // this.currentlyChecked = CheckBoxType.NONE;
      // return;

    }

    this.currentlyChecked = targetType;
    console.log("currentlchecked", this.currentlyChecked)
  }

  readDeliveryshifts(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
      console.log("resss", res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  Assign(employeeShiftId: any) {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.deliveryshiftService.GetDeliveryShiftByEmpShiftID(employeeShiftId).subscribe(res => {
      this.emp = res;
      console.log(this.emp)
      this.deliveryshiftService.AssignDelivery(this.emp).subscribe(data => {
        console.log(data)
      });
    });
    // this.deliveryshiftService.AssignLocalDelivery(this.sales).subscribe(data=>{
    //   console.log(data)});
    this.snack.open('Delivery Succesfully Assigned!', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
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





}
