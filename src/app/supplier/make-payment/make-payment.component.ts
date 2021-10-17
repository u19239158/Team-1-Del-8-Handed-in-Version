import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SupplierService } from 'src/app/services/supplier/supplier.service.component';
import { Supplier } from 'src/app/interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-make-payment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.scss']
})
export class MakePaymentComponent implements OnInit {
  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  supplier: Supplier;
  suppliers: Observable<Supplier[]>;
  userid : number;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private SupplierService: SupplierService,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = { };
    this.id = +this.route.snapshot.params['id'];
    this.form = this.formBuilder.group({
      supplierAmount: ['', [Validators.required]]
    }, formOptions);

    this.SupplierService.getSupplierByID(this.id).subscribe(res => {
      this.supplier = res
      console.log(res)
   })

   var ids = localStorage.getItem('user')
   const obj = JSON.parse(ids)
  console.log(obj.userId) 
  this.userid = obj.userId
   console.log(obj)
}

  onSubmit(){
    if (this.form.invalid) {
      return;
    }
    if (this.loading = true) 
      {
        this.CaptureSupplierPayment();
      }
  }

  CaptureSupplierPayment(){
    const supplier: Supplier = this.form.value;
    supplier.usersId = this.userid
    supplier.supplierId = this.supplier.supplierId;
    this.SupplierService.CaptureSupplierPayment(supplier).subscribe(res => {
      console.log(res)
      this.loading = false;
      this.router.navigateByUrl('supplier'),  
      this.snack.open('Successfully Captured Payment! ', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
    }, (error: HttpErrorResponse) => {
      console.log(error.error, "test")
      if (error.status === 400) {
        this.snack.open(error.error, 'OK',
          {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000
          });


        return;
      }
    })
  }

  Close(){
    this.form.reset();
    this.router.navigateByUrl('supplier');
  }
}
