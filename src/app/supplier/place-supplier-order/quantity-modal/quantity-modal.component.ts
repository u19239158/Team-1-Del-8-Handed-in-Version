import { PlaceSupplierOrder } from './../../../interfaces/index';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PlaceSupplierOrderService } from 'src/app/services/place-supplier-order/place-supplier-order.service';
@Component({
  selector: 'app-quantity-modal',
  templateUrl: './quantity-modal.component.html',
  styleUrls: ['./quantity-modal.component.scss']
})
export class QuantityModalComponent implements OnInit {
  form: FormGroup;
/**
   *
   * @param dialogRef {MatDialogRef<LogoutComponent>} this parameter controls the modal component and can call methods to close the modal
   */

 public event: EventEmitter<any> = new EventEmitter();

 constructor(private dialogRef: MatDialogRef<QuantityModalComponent>,
  private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private snack: MatSnackBar,
  private router: Router, 
  public PlaceSupplierOrder: PlaceSupplierOrderService,) { }


 ngOnInit(): void {
  const formOptions: AbstractControlOptions = { };
  this.form = this.formBuilder.group({
    quantity: ['', [Validators.required]],
       }, formOptions);
  }

 Confirm(): void {
  this.triggerEvent(this.form.value.quantity);
  //this.PlaceSupplierOrder.CreateSupplierOrder(this.form.value).subscribe(res => {
  this.dialogRef.close(true);

}

 Cancel(): void {
   this.dialogRef.close(false);
 }

//  saveToList(form) {
//   console.log(form.value);
// } 

  triggerEvent(quantity: number) {
    this.event.emit({quantity});
    localStorage.setItem('quantity', JSON.stringify(quantity));
    console.log(quantity);
  }
  
}