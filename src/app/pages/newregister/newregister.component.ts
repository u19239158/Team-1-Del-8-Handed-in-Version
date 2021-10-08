import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomerService } from 'src/app/services/customer/customer.service';
import { User } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-newregister',
  templateUrl: './newregister.component.html',
  styleUrls: ['./newregister.component.scss']
})
export class NewregisterComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  Customer: User;
  customers: Observable<User[]>;
  collection = [];
  selected: string;
  userid: number;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private CustomerService: CustomerService,
    private http: HttpClient) { }

  ngOnInit(): void {
    this.getCollection()
    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      titleID: ['', [Validators.required]],
      customerName: ['', [Validators.required]],
      customerSurname: ['', [Validators.required]],
      customerEmailAddress: ['', [Validators.required, Validators.email]],
      customerCellphoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      userUsername: ['', [Validators.required]],
      customerBusinessName: ['', [Validators.maxLength(50)]],
      customerVATReg: ['', [Validators.minLength(10), Validators.maxLength(10)]],
      userPassword: ['', [Validators.minLength(6), Validators.required, Validators.nullValidator]],
      customerConfirmPassword: ['', [Validators.required, Validators.nullValidator]],
    }, formOptions);
  }

  onSubmit() {
    const customer: User = this.form.value;
    if (customer.userPassword !== customer.customerConfirmPassword) {
      // alert("Your passwords do not match")
      this.snack.open('Your passwords do not match ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
      return
    }
    this.CustomerService.Register(customer).subscribe(res => {
      console.log(res)
      this.loading = false
     
      this.router.navigateByUrl('login');
 
    }), this.snack.open('Succesfully registered. Please Login ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
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

  Close() {
    this.form.reset();
    this.router.navigateByUrl('login');
  }

}
