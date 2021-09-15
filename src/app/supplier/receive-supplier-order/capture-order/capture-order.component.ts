import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-capture-order',
  templateUrl: './capture-order.component.html',
  styleUrls: ['./capture-order.component.scss']
})
export class CaptureOrderComponent implements OnInit {
 
  /**
   *
   * @param dialogRef {MatDialogRef<LogoutComponent>} this parameter controls the modal component and can call methods to close the modal
   */
  constructor(private dialogRef: MatDialogRef<CaptureOrderComponent>) { }

  ngOnInit(): void {
  }

  Confirm(): void {
    this.dialogRef.close(true);
  }

  Cancel(): void {
    this.dialogRef.close(false);
  }

}
