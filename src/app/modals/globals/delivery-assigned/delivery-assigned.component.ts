import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delivery-assigned',
  templateUrl: './delivery-assigned.component.html',
  styleUrls: ['./delivery-assigned.component.scss']
})
export class DeliveryAssignedComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeliveryAssignedComponent>) { }

  ngOnInit(): void {
  }

  Confirm(): void {
    this.dialogRef.close(true);
  }

}
