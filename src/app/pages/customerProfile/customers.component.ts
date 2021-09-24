import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {
  customer: Customer = {} as Customer;
  isSubmitted = false;
  //customers: Customer[] = [];
  //Customer: Customer;
  customers: Observable<Customer[]>;
  public topCustomers: any = [];

  constructor(
    private customerService: CustomerService,
    private httpClient: HttpClient,
    private router: Router) { }

  ngOnInit(): void {
    this.customerService.getCustomerByID(1)
      .subscribe(res => {
        this.topCustomers = res;
        console.log(this.topCustomers);
      })

    this.customerService.getCustomerByID(1).subscribe(res => {
      this.customer = res
      console.log(res)
    });


  }

  submitForm(form: NgForm) {
    this.isSubmitted = true;
    if (!form.valid) {
      return false;
    }
    else {
      document.querySelector('#deliveryModal').classList.add('is-active')
    }
  }

  editProfile() {
    this.router.navigateByUrl('/editProfile')
  }

  

  // readCustomers(): void {
  //    this.customerService.GetCustomer()
  //    .subscribe(res => {
  //     this.topCustomers = res;
  //     console.log(this.topCustomers);
  //    })
  // }


  // deleteCustomer(Customer: Customer) {
  //   const confirm = this.dialog.open(GlobalConfirmComponent, {
  //            disableClose: true,
  //           });

  //   confirm.afterClosed().subscribe(res => {
  //     if (res){
  //       this.customerService.DeleteCustomer(Customer).subscribe(res =>{
  //         this.readCustomers()
  //       })
  //     }
  //   });
  //}
}