import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-new-edit-profile',
  templateUrl: './new-edit-profile.component.html',
  styleUrls: ['./new-edit-profile.component.scss']
})
export class NewEditProfileComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({
    titleID: ['', [Validators.required]],
    customerName: ['', [Validators.required]],
    customerSurname: ['', [Validators.required]],
    customerEmailAddress: ['', [Validators.required, Validators.email]],
    customerCellphoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
    customerBusinessName: ['', [Validators.maxLength(50)]],
    customerVATReg: ['', [Validators.minLength(10), Validators.maxLength(10)]],
  });

  loading = false;
  submitted = false;
  customer: Customer;
  customers: Observable<Customer[]>;
  collection = [];
  selected: string;
  userid: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private CustomerService: CustomerService,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    this.userid = obj.userId

    this.getCollection();

    this.CustomerService.GetProfile(this.userid).subscribe(res => {
      this.customer = res;
      console.log("l54", this.customer)

    const formOptions: AbstractControlOptions = {};

    this.form = this.formBuilder.group({
      titleID: ['', [Validators.required]],
      customerName: [this.customer.customerName, [Validators.required]],
      customerSurname: [this.customer.customerSurname, [Validators.required]],
      customerEmailAddress: [this.customer.customerEmailAddress, [Validators.required, Validators.email]],
      customerCellphoneNumber: [this.customer.customerCellphoneNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      customerBusinessName: [this.customer.customerBusinessName, [Validators.maxLength(50)]],
      customerVATReg: [this.customer.customerVATReg, [Validators.minLength(10), Validators.maxLength(10)]],
    }, formOptions);
  });
  }


  onSubmit() {
    if (this.form.invalid) {
      return;
    }
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/Title/GetTitle').subscribe((res: any) => {
        this.collection = res;
        console.log("title", res);
      }, error => {
        console.log({ error });
      })
  }



  editCustomer() {
    const customer: Customer = this.form.value;
    customer.usersId = this.userid
    this.CustomerService.UpdateProfile(customer).subscribe(res => {
      console.log(res)
      this.snack.open('Successfully Updated Your Profile! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 3000
        });

      this.router.navigateByUrl('/customer');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('customer');
  }
}
