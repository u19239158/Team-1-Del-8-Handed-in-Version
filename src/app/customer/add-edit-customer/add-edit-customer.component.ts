import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
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
  collection = [];
  selected: string;

constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
    private snack : MatSnackBar,
      private customerService: CustomerService,
      private http: HttpClient    
) { }

ngOnInit(): void {
  this.id = +this.route.snapshot.params['id'];
  this.isAddMode = !this.id;
  this.getCollection();

  const passwordValidators = [Validators.minLength(6)];
  if (this.isAddMode) {
      passwordValidators.push(Validators.required);
  }

  const formOptions: AbstractControlOptions = { };
  this.form = this.formBuilder.group({
      titleId: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      customerSurname: ['', [Validators.required]],
      customerEmailAddress: ['', [Validators.required, Validators.email]],
      customerCellphoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
     // customerUsername: ['', [Validators.required]],
      customerBusinessName: ['', [Validators.maxLength(50)]],
      customerVATReg: ['', [Validators.maxLength(10)]],
      // customerPassword: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      // customerConfirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
  }, formOptions);


if (!this.isAddMode) {
  this.customerService.getCustomerByID(this.id).subscribe(res => {
    this.Customer = res
    console.log(res)
    this.form = this.formBuilder.group({
      titleId: [this.Customer.titleId, [Validators.required]],
      customerName:[this.Customer.customerName, [Validators.required]],
      customerSurname: [this.Customer.customerSurname, [Validators.required]],
      customerEmailAddress: [this.Customer.customerEmailAddress, [Validators.required, Validators.email]],
      customerCellphoneNumber: [this.Customer.customerCellphoneNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      //customerUsername: [this.Customer.customerUserName, [Validators.required]],
      customerBusinessName: [this.Customer.customerBusinessName, [Validators.maxLength(50)]],
      customerVATReg: [this.Customer.customerVATReg, [Validators.maxLength(10)]],
      // customerPassword: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      // customerConfirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
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

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/Title/GetTitle').subscribe((res: any) => {
        this.collection = res;
        //console.log = res;
      }, error => {
        console.log({ error });
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
    this.snack.open('Successfully Updated Customer! ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('customer');
  }
}

