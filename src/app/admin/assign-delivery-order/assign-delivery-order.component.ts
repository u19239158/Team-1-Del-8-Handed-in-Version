import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { AssignUnscheduledDelivery } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { UnscheduleddeliveryService } from 'src/app/services/unscheduleddelivery/unscheduleddelivery.service';
import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-assign-delivery-order',
  templateUrl: './assign-delivery-order.component.html',
  styleUrls: ['./assign-delivery-order.component.scss']
})
export class AssignDeliveryOrderComponent implements OnInit {

//search code
Unscheduleddeliverys: [];
searchValue: string;

  // unscheduleddeliverys: Unscheduleddelivery[] = [];
  // Unscheduleddelivery:Unscheduleddelivery;
  // unscheduleddelivery: Observable<Unscheduleddelivery[]>;
  // dataSource = new MatTableDataSource<>();
  displayedColumns: string[] = ['saleId', 'customerName', 'deliveryDistance', 'orderAddress', 'deliverycourier'];

  constructor(private UnscheduleddeliveryService: UnscheduleddeliveryService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
    ) {}

  ngOnInit(): void {
    
  }

}
