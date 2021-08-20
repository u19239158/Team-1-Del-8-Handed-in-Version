import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { HttpClient } from '@angular/common/http';

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

  //employees: Employee[] = [];
  Employee: Employee;
  employee: Observable<Employee[]>;
  dataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['name', 'employeePhoneNumber', 'dateOfBirth', 'actions'];

  constructor(private EmployeeService: EmployeeService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.readEmployees();

    this.EmployeeService.GetEmployee().subscribe((result: Employee[]) => {
      this.Employees = result;
    });

  }

  readEmployees(): void {
    this.EmployeeService.GetEmployee().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
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
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.EmployeeService.DeleteEmployee(Employee).subscribe(res => {
          this.readEmployees();
        })
      }
    });
  }

}
