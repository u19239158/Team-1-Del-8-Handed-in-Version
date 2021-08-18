import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute  } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import {  HttpClient  } from '@angular/common/http';

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

  deliveryshift: Deliveryshift[] = [];
  // DeliveryShift: Deliveryshift;
  deliveryShift: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  displayedColumns: string[] = ['startTime', 'endTime', 'dayOfTheWeek', 
  // 'assignee', 
  'actions'];

  constructor(private deliveryshiftService: DeliveryshiftService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private httpClient: HttpClient
              ) {}

  ngOnInit(): void {
    this.readDeliveryshifts();

    this.deliveryshiftService.GetDeliveryShift().subscribe((result:Deliveryshift[]) => {
      this.DeliveryShifts = result;
    });

  }

   readDeliveryshifts(): void {
     this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
   }

   filter(){
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.startTime.includes(this.searchValue)))
    // // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.endTime.includes(this.searchValue)))
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.dayOfTheWeek.includes(this.searchValue)))
    this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.employeeName.toLowerCase().includes(this.searchWord.toLowerCase())))
  }

  deleteDeliveryshift(Deliveryshift: Deliveryshift) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.deliveryshiftService.DeleteDeliveryShift(Deliveryshift).subscribe(res => {
          this.readDeliveryshifts();
        });
      }
    });
  }

  
}
