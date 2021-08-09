import { SupplierService } from 'src/app/services/supplier/supplier.service.component';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/interfaces';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-edit-supplier',
  templateUrl: './add-edit-supplier.component.html',
  styleUrls: ['./add-edit-supplier.component.scss']
})
export class AddEditSupplierComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    supplier: Supplier;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private SupplierService: SupplierService
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        supplierName: ['', [Validators.required]],
        supplierType: ['', [Validators.required]],
        supplierEmailAddress: ['', [Validators.required, Validators.email]],
        supplierContactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        supplierAddressLine1: ['', [Validators.required]],
        supplierAddressLine2: ['', [Validators.required]],
        supplierAddressLine3: ['', [Validators.required]],
        supplierCityTown: ['', [Validators.required]],
        supplierPostalCode: ['', [Validators.required, Validators.maxLength(4)]]
    }, formOptions);


  if (!this.isAddMode) {
    this.supplier = this.SupplierService.getSupplierById(this.id);

      this.form = this.formBuilder.group({
        supplierName: [this.supplier.supplierName, [Validators.required]],
        supplierType: [this.supplier.supplierType, [Validators.required]],
        supplierEmailAddress: [this.supplier.supplierEmailAddress, [Validators.required, Validators.email]],
        supplierContactNumber: [this.supplier.supplierContactNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        supplierAddressLine1: [this.supplier.supplierAddressLine1, [Validators.required]],
        supplierAddressLine2: [this.supplier.supplierAddressLine2, [Validators.required]],
        supplierAddressLine3: [this.supplier.supplierAddressLine3, [Validators.required]],
        supplierCityTown: [this.supplier.supplierCityTown, [Validators.required]],
        supplierPostalCode: [this.supplier.supplierPostalCode, [Validators.required, Validators.maxLength(4)]]
  },  formOptions);
}
}

onSubmit() {

  if (this.form.invalid) {
    return;
  }

  this.loading = true;
  if (this.isAddMode) {
      this.createSupplier();
  } else {
      this.updateSupplier();
  }
}

createSupplier() {
  const supplier: Supplier = this.form.value;
  this.SupplierService.addSupplier(supplier);
  this.router.navigateByUrl('supplierAdd');
}

updateSupplier() {
  const supplier: Supplier = this.form.value;
  supplier.id = this.supplier.id;
  this.SupplierService.updateSupplier(supplier);
  this.form.reset();
  this.router.navigateByUrl('supplierEdit');
}


Close() {
  this.form.reset();
  this.router.navigateByUrl('supplier');
}

matcher = new MyErrorStateMatcher();
}


