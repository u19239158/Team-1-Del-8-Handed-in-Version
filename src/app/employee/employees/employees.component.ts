import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { EmployeeService } from 'src/app/services/employee/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  employee: Observable<Employee[]>;
  dataSource = new MatTableDataSource<Employee>();
  displayedColumns: string[] = ['name', 'contactNumber', 'dateOfBirth', 'actions'];

  constructor(private employeeService: EmployeeService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.readEmployees();
  }

   readEmployees(): void {
     this.employeeService.GetEmployee().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
    }

  deleteEmployee(Employee: Employee) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.employeeService.DeleteEmployee(Employee);
        this.readEmployees();
      }
    });
  }

}
