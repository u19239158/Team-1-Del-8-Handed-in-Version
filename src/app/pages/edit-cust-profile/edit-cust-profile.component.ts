import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AbstractControlOptions, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-cust-profile',
  templateUrl: './edit-cust-profile.component.html',
  styleUrls: ['./edit-cust-profile.component.scss']
})
export class EditCustProfileComponent implements OnInit {

  customer: Customer = {} as Customer;
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
    private customerService: CustomerService,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {};
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getCollection();
    const passwordValidators = [Validators.minLength(6)];
    // if (this.isAddMode) {
    //     passwordValidators.push(Validators.required);
    // }
    //if (!this.isAddMode) {
    this.customerService.getCustomerByID(1).subscribe(res => {
      this.Customer = res
      console.log(res)
      this.form = this.formBuilder.group({
        titleID: [this.Customer.titleID, [Validators.required]],
        customerName: [this.Customer.customerName, [Validators.required]],
        customerSurname: [this.Customer.customerSurname, [Validators.required]],
        customerEmailAddress: [this.Customer.customerEmailAddress, [Validators.required, Validators.email]],
        customerCellphoneNumber: [this.Customer.customerCellphoneNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        //customerUsername: [this.Customer.customerUserName, [Validators.required]],
        customerBusinessName: [this.Customer.customerBusinessName, [Validators.maxLength(50)]],
        customerVATReg: [this.Customer.customerVATReg, [Validators.maxLength(10)]],
        titleDesc: [this.Customer.titleDesc, [Validators.maxLength(50)]],
        // customerPassword: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
        // customerConfirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
      }, formOptions);
    })
    // }
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
  }

  editCustomer() {
    const customer: Customer = this.form.value;
    customer.customerId = this.Customer.customerId;
    this.customerService.UpdateCustomer(customer).subscribe(res => {
      console.log(res)
      //this.form.reset();
      this.router.navigateByUrl('/customer');
    });
  }


  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/Title/GetTitle').subscribe((res: any) => {
        this.collection = res;
        console.log(res);
      }, error => {
        console.log({ error });
      })
  }

  Cancel() {
    this.router.navigateByUrl('/customer')
  }

}