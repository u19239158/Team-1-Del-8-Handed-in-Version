import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Courier } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { CourierService } from 'src/app/services/courier/courier.service';
import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.component.html',
  styleUrls: ['./couriers.component.scss']
})
export class CouriersComponent implements OnInit {

//search code
Couriers: Courier[];
searchValue: string;

  // couriers: Courier[] = [];
  Courier:Courier;
  courier: Observable<Courier[]>;
  dataSource = new MatTableDataSource<Courier>();
  displayedColumns: string[] = ['name', 'type', 'contactNumber', 'email', 'actions'];

  constructor(private CourierService: CourierService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private httpClient: HttpClient
              ) {}

  ngOnInit(): void {
    this.readCouriers();

    this.CourierService.GeCourier().subscribe((result:Courier[]) => {
      this.Couriers = result;
    });

  }

   readCouriers(): void {
     this.CourierService.GeCourier().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
    }

  filter(){
    this.dataSource = new MatTableDataSource (this.Couriers.filter(c=>c.courierTypeDescription.toLowerCase().includes(this.searchValue.toLowerCase())))
    this.dataSource = new MatTableDataSource (this.Couriers.filter(c=>c.courierName.toLowerCase().includes(this.searchValue.toLowerCase())))
  }

  deleteCourier(Courier: Courier) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.CourierService.DeleteCourier(Courier).subscribe(res => {
          this.readCouriers()
        })
      }
    });
  }
}
