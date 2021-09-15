import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { Employee } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { AssigndeliveryshiftService } from 'src/app/services/assigndeliveryshift/assigndeliveryshift.service';
import * as moment from 'moment';

@Component({
  selector: 'app-add-edit-deliveryshift',
  templateUrl: './add-edit-deliveryshift.component.html',
  styleUrls: ['./add-edit-deliveryshift.component.scss']
})

export class AddEditDeliveryshiftsComponent implements OnInit {

  form: FormGroup;
  // employeeShiftId: number;
  shiftId: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  deliveryshift: Deliveryshift = {} as Deliveryshift;
  deliveryshifts: Observable<Deliveryshift[]>
  collection = [];
  collections = [];
  employees = [];
  selected: string;
  selectemp: string;
  selectend: string;
  currentData = 2;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack :MatSnackBar,
    private DeliveryShiftService: DeliveryshiftService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.shiftId = +this.route.snapshot.params['id'];
    this.isAddMode = !this.shiftId;
    this.getCollection();
    this.getEmployees();

    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      // startTime: ['', [Validators.required]],
      // endTime: ['', [Validators.required]],
      dayOfTheWeek: ['', [Validators.required]],
      employeeID: ['', [Validators.required]],
      // employeeName: ['', [Validators.required]],
      // dateId: ['', [Validators.required]],
      timeId: ['', [Validators.required]],
    }, formOptions);

    if (!this.isAddMode) {
      console.log("test", this.shiftId)
      this.DeliveryShiftService.getDeliveryShiftByID(this.shiftId).subscribe(res => {
        this.deliveryshift = res
        console.log("res5", res)
        console.log("dayOfTheWeek", this.deliveryshift.dayOfTheWeek)
        this.form = this.formBuilder.group({
          dateId: [this.deliveryshift.dateId, [Validators.required]],
          timeId: [this.deliveryshift.timeId, [Validators.required]],
          // startTime: [this.deliveryshift.startTime, [Validators.required]],
          // endTime: [this.deliveryshift.endTime, [Validators.required]],
          dayOfTheWeek: [moment(this.deliveryshift.dayOfTheWeek).format('YYYY-MM-DD'), [Validators.required]],
          employeeID: [this.deliveryshift.employeeID],
          // employeeName: [this.deliveryshift.employeeName, [Validators.required]],
          // employeeShiftID: [this.deliveryshift.employeeShiftID],
          employeeShiftId: [this.deliveryshift.employeeShiftId],
        }, formOptions);
        // employeeId: [this.employeeShiftId, [Validators.required]],
      });
    }
  }

  // onSubmit() {

  //   if (this.form.invalid) {
  //     return;
  //   }

  //   this.loading = true;
  //   if (this.isAddMode) {
  //     this.createDeliveryshift();
  //   } else {
  //     this.updateDeliveryshift();
  //   }
  // }

  onSubmits() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.AssignDeliveryShifts();
    } else {
      this.updateDeliveryshift();
    }
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/DeliveryShift/GetShiftTime').subscribe((res: any) => {
        this.collections = res;
      }, error => {
        console.log({ error });
      });

  }

  getEmployees() {
    this.http
      .get<any>('https://localhost:44393/api/Employee/GetEmployee').subscribe((res: any) => {
        this.employees = res;
        console.log("res2", res);

        setTimeout(() => {
          // this.form.patchValue({ employeeId: 2 })
        }, 3000);

        // this.currentData = res.find(e => e.employeeId === this.employeeShiftId)
        // console.log("currentData", this.currentData);
      }, error => {
        console.log({ error });
      })

  }

  createDeliveryshift() {
    const deliveryshift: Deliveryshift = this.form.value;
    this.DeliveryShiftService.AssignDeliveryShift(deliveryshift).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('deliveryShift');
    });
  }

  AssignDeliveryShifts() {
    const deliveryshift: Deliveryshift = this.form.value;
    this.DeliveryShiftService.AssignDeliveryShifts(deliveryshift).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('deliveryShift');
    });
    this.snack.open('Successfully Added Delivery Shift! ', 'OK', 
    {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2000
    });
  }

  updateDeliveryshift() {
    const deliveryshift: Deliveryshift = this.form.value;
    deliveryshift.shiftId = this.deliveryshift.shiftId;
    const deliveryshiftS: Deliveryshift = this.form.value;
    deliveryshiftS.employeeShiftId = this.deliveryshift.employeeShiftId;
    console.log("deliveryshift", deliveryshift);
    //  deliveryshift.employeeID = this.deliveryshift.employeeID;
    this.DeliveryShiftService.UpdateDeliveryShift(deliveryshift).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('deliveryShift');
    });
    this.snack.open('Successfully Updated Delivery Shift! ', 'OK', 
    {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2000
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('deliveryShift');
  }
}

export class Datepicker { }

