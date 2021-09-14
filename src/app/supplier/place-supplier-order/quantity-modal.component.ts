import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier',
  templateUrl: 'quantity-modal.component.html',
})
export class QuantityModalComponent {
  // focus(): void {
  //   throw new Error('Method not implemented.');
  // }

  constructor(private dialogRef: MatDialogRef<QuantityModalComponent>) { }

  ngOnInit(): void {
  }

  // Confirm(): void {
  //   this.dialogRef.close(true);
  // }
  // Cancel(): void {
  //   this.dialogRef.close(false);
  // }

}
