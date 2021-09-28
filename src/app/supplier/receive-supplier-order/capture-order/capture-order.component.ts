import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ReceiveSupplierOrder } from 'src/app/interfaces';
import { ReceiveSupplierService } from 'src/app/services/supplier/receive-supplier-order';
import { QuantityModalComponent } from '../../place-supplier-order/quantity-modal/quantity-modal.component';

@Component({
  selector: 'app-capture-order',
  templateUrl: './capture-order.component.html',
  styleUrls: ['./capture-order.component.scss']
})
export class CaptureOrderComponent implements OnInit {
  displayedColumns: string[] = ['checkbox', 'productItemName', 'quantityOnHand'];
  dataSource = new MatTableDataSource<ReceiveSupplierOrder>();
  RecieveSupplierOrder: ReceiveSupplierOrder[];
  recievesupplierorder: ReceiveSupplierOrder;
  receiveSupplierOrders: ReceiveSupplierOrder[] = [];

  constructor(
    private receiveSupplierService: ReceiveSupplierService,
    private route: Router,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.readSupplierOrder();

    this.receiveSupplierService.ReceiveSupplierOrder().subscribe((result: ReceiveSupplierOrder[]) => {
      this.receiveSupplierOrders = result;
    })
  }

  readSupplierOrder(): void {
    this.receiveSupplierService.ReceiveSupplierOrder().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  AddQuantity() {
    const confirm = this.dialog.open(QuantityModalComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      this.router.navigateByUrl('captureOrder');
    })
  }
}
