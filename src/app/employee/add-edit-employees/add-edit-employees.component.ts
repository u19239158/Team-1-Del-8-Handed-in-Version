import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces';
import { MustMatch } from './must-match.validators';

@Component({
  selector: 'app-add-edit-employees',
  templateUrl: './add-edit-employees.component.html',
  styleUrls: ['./add-edit-employees.component.scss']
})

export class AddEditEmployeesComponent implements OnInit {

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  employee: Employee;
  employees: Observable<Employee[]>;

  constructor(
    private formBuilder: FormBuilder,
    private snack : MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private EmployeeService: EmployeeService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    const formOptions: AbstractControlOptions = { validators: MustMatch('userPassword', 'employeeConfirmPassword') };
    this.form = this.formBuilder.group({
      //title: ['', Validators.required],
      employeeName: ['', [Validators.required]],
      employeeSurname: ['', [Validators.required]],
      employeeCellphoneNumber: ['', [Validators.required, Validators.maxLength(10)]],
      employeeIdnumber: ['', [Validators.required, Validators.maxLength(13)]],
      employeeDob: ['', [Validators.required]],
      employeeAddressLine1: ['', [Validators.required]],
      employeeAddressLine2: ['', [Validators.required]],
      userUsername: ['', [Validators.required]],
      userPassword: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      employeeConfirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator]
    }, formOptions);

    console.log("notAddMode", !this.isAddMode)
    if (!this.isAddMode) {

      this.EmployeeService.getEmployeeByID(this.id).subscribe(res => {

        this.employee = res
        console.log("ress", res)
        this.form = this.formBuilder.group({
          // title: [this.employee.title, Validators.required],
          id: [this.employee.employeeId, Validators.required],
          employeeName: [this.employee.employeeName, [Validators.required]],
          employeeSurname: [this.employee.employeeSurname, [Validators.required]],
          employeeCellphoneNumber: [this.employee.employeeCellphoneNumber, [Validators.required, Validators.maxLength(10)]],
          employeeIdnumber: [this.employee.employeeIdnumber, [Validators.required, Validators.maxLength(13)]],
          employeeDob: [this.employee.employeeDob, [Validators.required]],
          employeeAddressLine1: [this.employee.employeeAddressLine1, [Validators.required]],
          employeeAddressLine2: [this.employee.employeeAddressLine2, [Validators.required]],
          // { value: this.employee.userUsername, disabled: true },
          userUsername: { value: this.employee.userUsername, disabled: true },
          userPassword: { value: this.employee.userPassword, disabled: true },
          employeeConfirmPassword: { value: this.employee.employeeConfirmPassword, disabled: true },
        }, formOptions);

      });
    }
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }
  }

  createEmployee() {
    const employee: Employee = this.form.value;
    this.EmployeeService.CreateEmployee(employee).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('employees');
    })
    this.snack.open('Successfully Added Employee! ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
    });
  }

  updateEmployee() {
    const employee: Employee = this.form.value;
    employee.employeeId = this.employee.employeeId;
    this.EmployeeService.UpdateEmployee(employee).subscribe(res => {
      console.log(res)
      // this.form.reset()
      this.router.navigateByUrl('employees');
    });
    this.snack.open('Successfully Updated Employee! ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000
    });
  }

  Close() {
    //this.form.reset();
    this.router.navigateByUrl('/employees');
  }

}
