import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  //search code
  Employees: Employee[];
  searchValue: string;
  dataNotFound: boolean;
  userid : number;
  //employees: Employee[] = [];
  Employee: Employee;
  employee: Observable<Employee[]>;
  dataSource = new MatTableDataSource<Employee>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['employeeSurname', 'employeeCellphoneNumber', 'employeeDob', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private EmployeeService: EmployeeService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.readEmployees();
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   this.userid = obj.userId
    this.EmployeeService.GetEmployee().subscribe((result: Employee[]) => {
      this.Employees = result;
    });

  }

  readEmployees(): void {
    this.EmployeeService.GetEmployee().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  filter() {

    const filter = (e) => {

      return e.employeeName && e.employeeName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.employeeSurname && e.employeeSurname.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.Employees.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)
  }

  deleteEmployee(Employee: Employee) {
    Employee.adminId = this.userid
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });
    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.EmployeeService.DeleteEmployee(Employee).subscribe(data => {
          this.readEmployees();
          this.snack.open('Successfully Deleted Employee! ', 'OK',
            {
              verticalPosition: 'bottom',
              horizontalPosition: 'center',
              duration: 3000
            });
        },
          (error: HttpErrorResponse) => {
            console.log(error.error, "test")
            if (error.status === 400) {
              this.snack.open(error.error, 'OK',
                {
                  verticalPosition: 'bottom',
                  horizontalPosition: 'center',
                  duration: 3000
                });
              return;
            }

          })

      }
    });

  }


  ;
}




