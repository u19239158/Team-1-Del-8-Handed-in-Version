import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-quantity-modal',
  templateUrl: './quantity-modal.component.html',
  styleUrls: ['./quantity-modal.component.scss']
})
export class QuantityModalComponent implements OnInit {
/**
   *
   * @param dialogRef {MatDialogRef<LogoutComponent>} this parameter controls the modal component and can call methods to close the modal
   */
 constructor(private dialogRef: MatDialogRef<QuantityModalComponent>) { }

 ngOnInit(): void {
 }

 Confirm(): void {
   this.dialogRef.close(true);
 }

 Cancel(): void {
   this.dialogRef.close(false);
 }

}