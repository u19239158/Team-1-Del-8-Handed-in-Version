import { ReceiveSupplierService } from 'src/app/services/supplier/receive-supplier-order';
import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-quantity-received',
  templateUrl: './quantity-received.component.html',
  styleUrls: ['./quantity-received.component.scss']
})
export class QuantityReceivedComponent implements OnInit {
  form: FormGroup;
  quantity: number;

  public event: EventEmitter<any> = new EventEmitter();

  constructor(private dialogRef: MatDialogRef<QuantityReceivedComponent>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    public ReceiveSupplierOrder: ReceiveSupplierService,) { }


  ngOnInit(): void {

    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      quantity: ['', [Validators.required]],

    }, formOptions);

    console.log(this.quantity)

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
    this.event.emit({ quantity });
    localStorage.setItem('invoiceQuantity', JSON.stringify(quantity));
    console.log(quantity);
  }

}