import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { SupplierService } from 'src/app/services/supplier/supplier.service.component';
import { Supplier } from 'src/app/interfaces';

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
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private SupplierService: SupplierService
    ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];

    const formOptions: AbstractControlOptions = { };

    this.SupplierService.getSupplierByID(this.id).subscribe(res => {
      this.supplier = res
      console.log(res)
    this.form = this.formBuilder.group({
      supplierAmount: ['', [Validators.required]]
    }, formOptions);})
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
    supplier.supplierId = this.supplier.supplierId;
    this.SupplierService.CaptureSupplierPayment(supplier).subscribe(res => {
      console.log(res)
      this.loading = false;
      this.router.navigateByUrl('supplier')
    })
  }

  Close(){
    this.form.reset();
    this.router.navigateByUrl('supplier');
  }
}
