import { Observable } from 'rxjs';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { Employee } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { AssigndeliveryshiftService } from 'src/app/services/assigndeliveryshift/assigndeliveryshift.service';

@Component({
  selector: 'app-add-edit-deliveryshift',
  templateUrl: './add-edit-deliveryshift.component.html',
  styleUrls: ['./add-edit-deliveryshift.component.scss']
})

export class AddEditDeliveryshiftsComponent implements OnInit {

    form: FormGroup;
    employeeShiftId: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    deliveryshift: Deliveryshift;
    deliveryshifts: Observable<Deliveryshift[]>
    collection = [];
    collections = [];
    employees = [];
    selected: string;
    selectemp: string;
    selectend: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private DeliveryShiftService: DeliveryshiftService,
        private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.employeeShiftId = +this.route.snapshot.params['id'];
    this.isAddMode = !this.employeeShiftId;
    this.getCollection();
    this.getEmployees();

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        startTime: ['', [Validators.required]],
        endTime: ['',[Validators.required]],
        dayOfTheWeek: ['', [Validators.required]],
        employeeId: ['', [Validators.required]],
        employeeName: ['', [Validators.required]],
        dateId: ['', [Validators.required]],
          timeId: ['', [Validators.required]],
     }, formOptions);

    if (!this.isAddMode) {
      this.DeliveryShiftService.getDeliveryShiftByID(this.employeeShiftId).subscribe(res => {
        this.deliveryshift = res
        console.log(res)
        this.form = this.formBuilder.group({
          dateId: [this.deliveryshift.dateId, [Validators.required]],
          timeId: [this.deliveryshift.timeId, [Validators.required]],
          startTime: [this.deliveryshift.startTime, [Validators.required]],
          endTime: [this.deliveryshift.endTime,[Validators.required]],
          dayOfTheWeek: [this.deliveryshift.dayOfTheWeek, [Validators.required]],
          employeeId: [this.deliveryshift.employeeId, [Validators.required]],
          employeeName: [this.deliveryshift.employeeName, [Validators.required]],
          employeeShiftId:  [this.deliveryshift.employeeShiftId, [Validators.required]],
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
        this.createDeliveryshift();
    } else {
        this.updateDeliveryshift();
    }
  }

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
        console.log(res);
      }, error => {
        console.log({ error });
      });

    }

    getEmployees() {
      this.http
    .get<any>('https://localhost:44393/api/Employee/GetEmployee').subscribe((res: any) => {
      this.employees = res;
      console.log(res);
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
  }

  updateDeliveryshift() {
    const deliveryshift: Deliveryshift = this.form.value;
    deliveryshift.employeeShiftId = this.deliveryshift.employeeShiftId;
    this.DeliveryShiftService.UpdateDeliveryShift(deliveryshift).subscribe(res => {
      console.log(res)
      this.form.reset();
    this.router.navigateByUrl('deliveryShift');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('deliveryShift');
  }
}

export class Datepicker {}

