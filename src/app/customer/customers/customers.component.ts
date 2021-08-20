import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

  //search code
Customers: Customer[];
searchValue: string;
dataNotFound: boolean;

//customers: Customer[] = [];
Customer: Customer;
customers: Observable<Customer[]>;
dataSource = new MatTableDataSource<Customer>();
displayedColumns: string[] = ['name', 'customerCellphoneNumber', 'email', 'businessName', 'vat', 'actions'];

constructor(private customerService: CustomerService,
  private snack: MatSnackBar,
  private router: Router,
  private dialog: MatDialog,
  private httpClient: HttpClient) { }

ngOnInit(): void {
  this.readCustomers();

  this.customerService.GetCustomer().subscribe((result:Customer[]) => {
    this.Customers = result;
  });

}

readCustomers(): void {
   this.customerService.GetCustomer().subscribe(res => {
     console.log(res)
     this.dataSource = new MatTableDataSource(res)
   })
}

filter(){

  const filter = (e) => {

    return e.customerName && e.customerName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      e.customerSurname && e.customerSurname.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      e.customerBusinessName && e.customerBusinessName.toLowerCase().includes(this.searchValue.toLowerCase()) 
  }
  const data = (this.Customers.filter(filter))
  this.dataNotFound = data.length===0
  this.dataSource = new MatTableDataSource(data)
}

deleteCustomer(Customer: Customer) {
  const confirm = this.dialog.open(GlobalConfirmComponent, {
           disableClose: true,
          });

  confirm.afterClosed().subscribe(res => {
    if (res){
      this.customerService.DeleteCustomer(Customer).subscribe(res =>{
        this.readCustomers()
      })
    }
  });
}
}
