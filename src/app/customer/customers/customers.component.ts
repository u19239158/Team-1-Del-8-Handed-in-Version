import { CustomerService } from './../../services/customer/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/interfaces';
import { Router, ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

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
  userid : number;
  //customers: Customer[] = [];
  Customer: Customer;
  customers: Observable<Customer[]>;
  dataSource = new MatTableDataSource<Customer>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['customerName', 'customerCellphoneNumber', 'customerEmailAddress', 'customerBusinessName', 'customerVATReg', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private customerService: CustomerService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient) { }

  ngOnInit(): void {

    this.readCustomers();
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   this.userid = obj.userId
    this.customerService.GetCustomer().subscribe((result: Customer[]) => {
      this.Customers = result;
    });
    setTimeout(() => this.dataSource.paginator = this.paginator);
  }

  readCustomers(): void {
    this.customerService.GetCustomer().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  filter() {

    const filter = (e) => {

      return e.customerName && e.customerName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.customerSurname && e.customerSurname.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.customerBusinessName && e.customerBusinessName.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.Customers.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)
  }


  // filter(){
  //   this.dataSource = new MatTableDataSource (this.Customers.filter(e=>e.customerName.toLowerCase().includes(this.searchValue.toLowerCase())))
  //   this.dataSource = new MatTableDataSource (this.Customers.filter(e=>e.customerSurname.toLowerCase().includes(this.searchValue.toLowerCase())))
  //   this.dataSource = new MatTableDataSource (this.Customers.filter(e=>e.customerBusinessName.toLowerCase().includes(this.searchValue.toLowerCase())))
  // }

  deleteCustomer(Customer: Customer) {
    Customer.usersId = this.userid
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.customerService.DeleteCustomer(Customer).subscribe(res => {
          this.readCustomers();
          this.snack.open('Successfully Deleted Customer! ', 'OK',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 4000
            });
        }, (error: HttpErrorResponse) => {
          console.log(error.error, "test")
          if (error.status === 400) {
            this.snack.open(error.error, 'OK',
              {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 4000
              });
            return;
          }
        })

      }

    });


  }
}
