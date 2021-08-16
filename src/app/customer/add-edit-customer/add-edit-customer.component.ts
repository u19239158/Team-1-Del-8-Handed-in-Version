import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces';
import { MustMatch } from './must-match.validators';

@Component({
  selector: 'app-add-edit-customer',
  templateUrl: './add-edit-customer.component.html',
  styleUrls: ['./add-edit-customer.component.scss']
})
export class AddEditCustomerComponent implements OnInit {

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  Customer: Customer;
  customers: Observable<Customer[]>;

constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private customerService: CustomerService
) { }

ngOnInit(): void {
  this.id = +this.route.snapshot.params['id'];
  this.isAddMode = !this.id;

  const passwordValidators = [Validators.minLength(6)];
  if (this.isAddMode) {
      passwordValidators.push(Validators.required);
  }

  const formOptions: AbstractControlOptions = { validators: MustMatch('customerPassword', 'customerConfirmPassword')};
  this.form = this.formBuilder.group({
      customerName: ['', [Validators.required]],
      customerSurname: ['', [Validators.required]],
      customerEmail: ['', [Validators.required, Validators.email]],
      customerContactNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      customerUsername: ['', [Validators.required]],
      customerBusinessName: ['', [Validators.maxLength(50)]],
      customerVat: ['', [Validators.maxLength(10)]],
      customerPassword: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      customerConfirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
  }, formOptions);


if (!this.isAddMode) {
  this.customerService.getCustomerByID(this.id).subscribe(res => {
    this.Customer = res
    console.log(res)
    this.form = this.formBuilder.group({
      customerName:[this.Customer.customerName, [Validators.required]],
      customerSurname: [this.Customer.customerSurname, [Validators.required]],
      customerEmail: [this.Customer.customerEmail, [Validators.required, Validators.email]],
      customerContactNumber: [this.Customer.customerContactNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      customerUsername: [this.Customer.customerUserName, [Validators.required]],
      customerBusinessName: [this.Customer.customerBusinessName, [Validators.maxLength(50)]],
      customerVat: [this.Customer.customerVat, [Validators.maxLength(10)]],
      customerPassword: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      customerConfirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
},  formOptions);
  })
}
}
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createCustomer();
    } else {
        this.updateCustomer();
    }
  }

  createCustomer() {
    const customer: Customer = this.form.value;
    this.customerService.CreateCustomer(customer).subscribe(res =>{
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('customer');
    })

  }
  updateCustomer() {
    const customer: Customer = this.form.value;
    customer.customerId = this.Customer.customerId;
    this.customerService.UpdateCustomer(customer).subscribe(res =>{
      console.log(res)
      //this.form.reset();
      this.router.navigateByUrl('customer');
    });

  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('customer');
  }
}

