import { SupplierService } from 'src/app/services/supplier/supplier.service.component';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/interfaces';

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
        supplierName: ['', Validators.required],
        supplierEmailAddress: ['', Validators.required],
        supplierContactNumber: ['', Validators.required, Validators.maxLength(10)],
        supplierAddressLine1: ['', Validators.required],
        supplierAddressLine2: ['', Validators.required],
        supplierAddressLine3: ['', Validators.required],
        supplierCityTown: ['', Validators.required],
        supplierPostalCode: ['', Validators.required, Validators.maxLength(4)]
    }, formOptions);

  if (!this.isAddMode) {
    this.supplier = this.SupplierService.getSupplierById(this.id);

      this.form = this.formBuilder.group({
        supplierName: [this.supplier.supplierName, Validators.required],
        supplierEmailAddress: [this.supplier.supplierEmailAddress, Validators.required],
        supplierContactNumber: [this.supplier.supplierContactNumber, Validators.required, Validators.maxLength(10)],
        supplierAddressLine1: [this.supplier.supplierAddressLine1, Validators.required],
        supplierAddressLine2: [this.supplier.supplierAddressLine2, Validators.required],
        supplierAddressLine3: [this.supplier.supplierAddressLine3, Validators.required],
        supplierCityTown: [this.supplier.supplierCityTown, Validators.required],
        supplierPostalCode: [this.supplier.supplierPostalCode, Validators.required, Validators.maxLength(4)]
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
  this.router.navigateByUrl('');
}

updateSupplier() {
  const supplier: Supplier = this.form.value;
  supplier.id = this.supplier.id;
  this.SupplierService.updateSupplier(supplier);
  this.form.reset();
  this.router.navigateByUrl('');
}


Close() {
  this.form.reset();
  this.router.navigateByUrl('');
}

}


