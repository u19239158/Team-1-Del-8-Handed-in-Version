import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-supplier',
  templateUrl: 'quantity-modal.component.html',
})
export class QuantityModalComponent {
 
  constructor(private dialogRef: MatDialogRef<QuantityModalComponent>) { }

  ngOnInit(): void {
  }

}
