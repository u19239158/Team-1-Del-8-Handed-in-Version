import { ReceiveSupplierService } from './../../services/supplier/receive-supplier-order';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ReceiveSupplierOrder } from 'src/app/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.scss']
})
export class ReceiveSupplierOrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'orderDatePlaced', 'orderDateReceived', 'invoiceNumber', 'invoiceDate', 'invoiceTotal','actions'];
  receiveSupplierOrders: ReceiveSupplierOrder[] = [];
  receiveSupplierOrder: Observable<ReceiveSupplierOrder[]>;
  dataSource = new MatTableDataSource<ReceiveSupplierOrder>();


  constructor(
    private receiveSupplierService: ReceiveSupplierService,
    private route: Router,
  ) { }

  ngOnInit(): void {
  }

}
