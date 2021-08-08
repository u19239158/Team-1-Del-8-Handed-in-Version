import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  message = this.data.error;
  constructor(@Inject(MAT_DIALOG_DATA) private data: {error: any}) { }

  ngOnInit(): void {
  }

}
