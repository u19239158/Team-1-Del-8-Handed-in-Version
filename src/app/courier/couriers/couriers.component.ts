import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Courier } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { CourierService } from 'src/app/services/courier/courier.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-couriers',
  templateUrl: './couriers.component.html',
  styleUrls: ['./couriers.component.scss']
})
export class CouriersComponent implements OnInit {

  //search code
  Couriers: Courier[];
  searchValue: string;
  dataNotFound: boolean;

  // couriers: Courier[] = [];
  Courier: Courier;
  courier: Observable<Courier[]>;
  dataSource = new MatTableDataSource<Courier>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'type', 'contactNumber', 'email', 'actions'];

  constructor(private CourierService: CourierService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }


  ngOnInit(): void {
    this.readCouriers();
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.CourierService.GeCourier().subscribe((result: Courier[]) => {
      this.Couriers = result;
    });

  }

  readCouriers(): void {
    this.CourierService.GeCourier().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  filter() {

    const filter = (e) => {

      return e.courierName && e.courierName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.courierTypeDescription && e.courierTypeDescription.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.Couriers.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)

  }

  deleteCourier(Courier: Courier) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.CourierService.DeleteCourier(Courier).subscribe(res => {
          this.readCouriers()
          this.snack.open('Successfully Deleted Courier! ', 'OK', 
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
        },(error: HttpErrorResponse) =>
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
        }
      })
      }
      
    });
  }
}
