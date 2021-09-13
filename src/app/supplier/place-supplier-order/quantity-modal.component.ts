import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaceSupplierOrderComponent } from './place-supplier-order.component';

@Component({
  selector: 'quantity-modal',
  templateUrl: 'quantity-modal.html',
})
export class QuantityModal {

  constructor(private dialogRef: MatDialogRef<PlaceSupplierOrderComponent>) { }

  ngOnInit(): void {
  }

  Confirm(): void {
    this.dialogRef.close(true);
  }
  Cancel(): void {
    this.dialogRef.close(false);
  }

}
