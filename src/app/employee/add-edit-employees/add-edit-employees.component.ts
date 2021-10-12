import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces';
import { MustMatch } from './must-match.validators';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

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
  maxDate: Date;
  selectedDate = new Date();
  collections = [];
  times = [];
  userid: number;

  constructor(
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private EmployeeService: EmployeeService,
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = moment().subtract(15, 'years',).toDate();
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    console.log(obj.userId)
    this.userid = obj.userId
    console.log(obj)

    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    const formOptions: AbstractControlOptions = { validators: MustMatch('userPassword', 'employeeConfirmPassword') };
    this.form = this.formBuilder.group({
      //title: ['', Validators.required],
      employeeName: ['', [Validators.required]],
      employeeSurname: ['', [Validators.required]],
      employeeCellphoneNumber: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
      employeeIdnumber: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      employeeDob: ['', [Validators.required]],
      employeeAddressLine1: ['', [Validators.required]],
      employeeAddressLine2: ['',],
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
          employeeCellphoneNumber: [this.employee.employeeCellphoneNumber, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10), Validators.maxLength(10)]],
          employeeIdnumber: [this.employee.employeeIdnumber, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
          employeeDob: [this.employee.employeeDob, [Validators.required]],
          employeeAddressLine1: [this.employee.employeeAddressLine1, [Validators.required]],
          employeeAddressLine2: [this.employee.employeeAddressLine2,],
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

    const employee: Employee = this.form.value;
    const DOBidNumber = employee.employeeIdnumber.toString().slice(0, 6);
    const DOB = moment(employee.employeeDob).format('YYMMDD');
    console.log(DOBidNumber, DOB)
    if (DOBidNumber !== DOB) {
      this.snack.open('ID Number does not match Date of Birth', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
      this.form.controls['employeeIdnumber'].setErrors({ 'incorrect': true });
      this.form.controls['employeeIdnumber'].reset();
      this.form.controls['employeeIdnumber'].setValue(employee.employeeIdnumber);

      this.form.controls['employeeDob'].setErrors({ 'incorrect': true });
      this.form.controls['employeeDob'].reset();
      this.form.controls['employeeDob'].setValue(employee.employeeDob);
      return
    }

    this.form.controls['employeeIdnumber'].setErrors({ 'incorrect': false });
    this.form.controls['employeeDob'].setErrors({ 'incorrect': false });
    this.loading = true;

    if (this.isAddMode) {
      this.createEmployee();
    } else {
      this.updateEmployee();
    }
  }

  createEmployee() {
    const employee: Employee = this.form.value;
    employee.usersId = this.userid
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
    employee.usersId = this.userid
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
