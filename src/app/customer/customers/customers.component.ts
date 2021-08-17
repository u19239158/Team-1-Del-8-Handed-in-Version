import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
//customers: Customer[] = [];
Customer: Customer;
customers: Observable<Customer[]>;
dataSource = new MatTableDataSource<Customer>();
displayedColumns: string[] = ['name', 'contactNumber', 'email', 'businessName', 'vat', 'actions'];

constructor(private customerService: CustomerService,
  private snack: MatSnackBar,
  private router: Router,
  private dialog: MatDialog) { }

ngOnInit(): void {
  this.readCustomers();
}

readCustomers(): void {
   this.customerService.GetCustomer().subscribe(res => {
     console.log(res)
     this.dataSource = new MatTableDataSource(res)
   })
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
