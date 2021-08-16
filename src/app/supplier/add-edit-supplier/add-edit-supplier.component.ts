import { Supplier } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { SupplierService } from 'src/app/services/supplier/supplier.service.component';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    suppliers: Observable<Supplier[]>;

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
        supplierEmail: ['', [Validators.required, Validators.email]],
        supplierNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        supplierAddressLine1: ['', [Validators.required]],
        supplierAddressLine2: ['', [Validators.required]],
        supplierAddressLine3: [''],
        supplierCityTown: ['', [Validators.required]],
        supplierPostalCode: ['', [Validators.required, Validators.maxLength(4)]],
    }, formOptions);

  if (!this.isAddMode) {
    this.SupplierService.getSupplierByID(this.id).subscribe(res => {
      this.supplier = res
      console.log(res)
      this.form = this.formBuilder.group({
        id: [this.supplier.supplierID, Validators.required],
        supplierName: [this.supplier.supplierName, [Validators.required]],
        supplierType: [this.supplier.supplierTypeDesc],
        supplierEmail: [this.supplier.supplierEmail, [Validators.required, Validators.email]],
        supplierNumber: [this.supplier.supplierNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        supplierAddressLine1: [this.supplier.supplierAddressLine1, [Validators.required]],
        supplierAddressLine2: [this.supplier.supplierAddressLine2, [Validators.required]],
        supplierAddressLine3: [this.supplier.supplierAddressLine3],
        supplierCityTown: [this.supplier.supplierCityTown, [Validators.required]],
        supplierPostalCode: [this.supplier.supplierPostalCode, [Validators.required, Validators.maxLength(4)]],
  },  formOptions);
    });
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

createSupplier(){
  const supplier: Supplier = this.form.value;
  this.SupplierService.CreateSupplier(supplier).subscribe(res => {
    console.log(res)
    this.loading = false;
    this.router.navigateByUrl('supplier')
  })
}

  updateSupplier() {
    const supplier: Supplier = this.form.value;
    supplier.supplierID = this.supplier.supplierID;
    this.SupplierService.UpdateSupplier(supplier).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('supplier');
    });
  }

Close() {
  this.form.reset();
  this.router.navigateByUrl('supplier');
}
}

