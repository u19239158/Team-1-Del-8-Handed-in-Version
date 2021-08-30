import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { Component, OnInit,Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {

//customers: Customer[] = [];
//Customer: Customer;
customers: Observable<Customer[]>;
public topCustomers : any = [];

constructor(private customerService: CustomerService, private httpClient: HttpClient) { }

ngOnInit(): void {
    //Home page different categories of products
    this.customerService.GetCustomer()
    .subscribe(res=>{
      this.topCustomers=res;
      console.log(this.topCustomers);
    })

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
