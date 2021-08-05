// import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/interfaces';

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

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private EmployeeService: EmployeeService,
    ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        contactNumber: ['', Validators.required, Validators.maxLength(10)],
        idNumber: ['', Validators.required, Validators.maxLength(13)],
        dateOfBirth: ['', Validators.required],
        addressLine1: ['', Validators.required],
        addressLine2: ['', Validators.required],
        addressLine3: ['', Validators.required],
        cityTown: ['', Validators.required],
        postalCode: ['', Validators.required, Validators.maxLength(4)]
    }, formOptions);

    if (!this.isAddMode) {
      this.employee = this.EmployeeService.getEmployeeById(this.id);

        this.form = this.formBuilder.group({
        title: [this.employee.title, Validators.required],
        firstName: [this.employee.firstName, Validators.required],
        lastName: [this.employee.lastName, Validators.required],
        contactNumber: [this.employee.contactNumber, Validators.required, Validators.maxLength(10)],
        idNumber: [this.employee.idNumber, Validators.required, Validators.maxLength(13)],
        dateOfBirth: [this.employee.dateOfBirth, Validators.required],
        addressLine1: [this.employee.addressLine1, Validators.required],
        addressLine2: [this.employee.addressLine2, Validators.required],
        addressLine3: [this.employee.addressLine3, Validators.required],
        cityTown: [this.employee.cityTown, Validators.required],
        postalCode: [this.employee.postalCode, Validators.required, Validators.maxLength(4)]
    }, formOptions);
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
    this.EmployeeService.addEmployee(employee);
    this.router.navigateByUrl('employeeAdd');
  }

  updateEmployee() {
    const employee: Employee = this.form.value;
    employee.id = this.employee.id;
    this.EmployeeService.updateEmployee(employee);
    this.form.reset();
    this.router.navigateByUrl('employeeEdit');
  }


  Close() {
    this.form.reset();
    this.router.navigateByUrl('');
  }

}
