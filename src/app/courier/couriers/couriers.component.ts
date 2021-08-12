import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Courier } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { CourierService } from 'src/app/services/courier/courier.service';

@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.component.html',
  styleUrls: ['./couriers.component.scss']
})
export class CouriersComponent implements OnInit {

  couriers: Courier[] = [];
  courier: Observable<Courier[]>;
  dataSource = new MatTableDataSource<Courier>();
  displayedColumns: string[] = ['name', 'type', 'contactNumber', 'email', 'actions'];

  constructor(private courierService: CourierService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.readCouriers();
  }

   readCouriers(): void {
     this.courierService.GeCourier().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res);
     })
    //this.dataSource = new MatTableDataSource<Courier>(this.courierService.getAll());
  }

  deleteCourier(Courier: Courier) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.courierService.DeleteCourier(Courier).subscribe(res => {
          this.readCouriers()
        })
      }
    });
  }
}
