import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';

@Component({
  selector: 'app-deliveryshifts',
  templateUrl: './deliveryshifts.component.html',
  styleUrls: ['./deliveryshifts.component.scss']
})
export class DeliveryshiftsComponent implements OnInit {

  deliveryshifts: Deliveryshift[] = [];
  deliveryShift: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  displayedColumns: string[] = ['startTime', 'endTime', 'dayOfTheWeek', 
  // 'assign', 
   'actions'];

  constructor(private deliveryshiftService: DeliveryshiftService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.readDeliveryshifts();
  }

   readDeliveryshifts(): void {
     this.deliveryshiftService.GetDeliveryShift().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
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
