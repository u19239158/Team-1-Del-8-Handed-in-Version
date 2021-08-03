import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-global-confirm',
  templateUrl: './global-confirm.component.html',
  styleUrls: ['./global-confirm.component.scss']
})
/**
 * This component is a modal component which is opened by another component.
 * It will give the user an option to choose yes or no as a confirmation for deletes
 */
export class GlobalConfirmComponent implements OnInit {
  /**
   * 
   * @param dialogRef {MatDialogRef<GlobalConfirmComponent>} this parameter controls the modal component and can call methods to close the modal
   */
  constructor(private dialogRef: MatDialogRef<GlobalConfirmComponent>) { }

  ngOnInit(): void {
  }

  /**
   * Once yes is clicked the modal will close with an argument of true to indicate that the deletion was confirmed.
   */
  Confirm(): void {
    this.dialogRef.close(true);
  }

  /**
   * Once no is clicked the modal will close with an argument of false to indicate that the deletion was not confirmed.
   */
  Cancel(): void {
    this.dialogRef.close(false);
  }

}
