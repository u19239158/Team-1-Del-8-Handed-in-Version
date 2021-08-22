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

@Component({
  selector: 'app-assign-delivery-order',
  templateUrl: './assign-delivery-order.component.html',
  styleUrls: ['./assign-delivery-order.component.scss']
})
export class AssignDeliveryOrderComponent implements OnInit {
  // var1 = false;

  //search code
  Deliveryshifts: Deliveryshift[];
  searchValue: string;
  dataNotFound: boolean;

  // unscheduleddeliverys: Deliveryshift[] = [];
  Deliveryshift: Deliveryshift;
  UnscheduledDelivery: Deliveryshift[];
  unscheduleddelivery: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  displayedColumns: string[] = ['saleId', 'customerName', 'deliverydistance', 'orderAddress', 'deliverycourier'];

  constructor(private DeliveryshiftService: DeliveryshiftService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.readUnscheduledDeliveries();

    this.DeliveryshiftService.GetUnscheduledDeliveries().subscribe((result: Deliveryshift[]) => {
      this.UnscheduledDelivery = result;
    })
  }

  filter() {

    const filter = (e) => {

      return e.saleId && e.saleId.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.customerName && e.customerName.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    // const data = (this.Deliveryshift.filter(filter))
    // this.dataNotFound = data.length === 0
    // this.dataSource = new MatTableDataSource(data)

  }

  parseInteger(value) {
    return parseInt(value)
  }

  readUnscheduledDeliveries(): void {
    //this.dataSource = new MatTableDataSource<UserRole[]>(this.UserRoleService.GetUserRole());
    this.DeliveryshiftService.GetUnscheduledDeliveries().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

}
