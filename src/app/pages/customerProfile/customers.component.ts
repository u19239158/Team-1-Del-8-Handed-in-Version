import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {
  customer: Customer = {} as Customer;
  isSubmitted = false;
  userid : number;
  customers: Observable<Customer[]>;

  constructor(
    private customerService: CustomerService,
    private httpClient: HttpClient,
    private router: Router,
    private snack: MatSnackBar
    ) { }

  ngOnInit(): void {
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    if(obj == null){
      this.snack.open('You are not logged in. Please login to view your profile.', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
        });
        this.router.navigateByUrl('/login')
    }
   console.log(obj.userId) 
   this.userid = obj.userId
    console.log(obj)

    // this.customerService.GetProfile(1)
    //   .subscribe(res => {
    //     this.customer = res;
    //     console.log(this.customer);
    //   })

    this.customerService.GetProfile(obj.userId)
    .subscribe(res => {
      this.customer = res
      console.log(res)
      console.log(this.customer)
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
  // }
}
