import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.scss']
})
export class ReceiveSupplierOrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'orderDatePlaced', 'orderDateReceived', 'invoiceNumber', 'invoiceDate', 'invoiceTotal','items'];
  // supplierOrder: SupplierOrder[] = [];
  // supplier: Observable<SupplierOrder[]>;
  // dataSource = new MatTableDataSource<SupplierOrder>();


  constructor() { }

  ngOnInit(): void {
  }

}
