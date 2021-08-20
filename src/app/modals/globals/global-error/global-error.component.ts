import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-global-error',
  templateUrl: './global-error.component.html',
  styleUrls: ['./global-error.component.scss']
})

/**
 * 
 * This component was not used but you can use it in your own implementations if you want 
 * to create a generic modal that will display error messages.
 */
export class GlobalErrorComponent implements OnInit {
 /**
   * 
   * @param dialogRef {MatDialogRef<GlobalErrorComponent>} this parameter controls the modal component and can call methods to close the modal
   */
  constructor(private dialogRef: MatDialogRef<GlobalErrorComponent>) { }

  ngOnInit(): void {
  }

      /**
       * Once ok is clicked the modal will close 
       */
      Cancel(): void {
        this.dialogRef.close(false);
      }

}
