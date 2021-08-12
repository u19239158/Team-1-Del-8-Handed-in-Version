import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-deliveryshift',
  templateUrl: './add-edit-deliveryshift.component.html',
  styleUrls: ['./add-edit-deliveryshift.component.scss']
})

export class AddEditDeliveryshiftsComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    deliveryshift: Deliveryshift;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private DeliveryShiftService: DeliveryshiftService
    ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        startTime: ['', [Validators.required]],
        endTime: ['',[Validators.required]],
        date: ['', [Validators.required]],
     }, formOptions);

    if (!this.isAddMode) {
      this.deliveryshift = this.DeliveryShiftService.getDeliveryshiftById(this.id);

        this.form = this.formBuilder.group({
        startTime: [this.deliveryshift.startTime, [Validators.required]],
        endTime: [this.deliveryshift.endTime,[Validators.required]],
        date: [this.deliveryshift.date, [Validators.required]],
    }, formOptions);
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

  createDeliveryshift() {
    const deliveryshift: Deliveryshift = this.form.value;
    this.DeliveryShiftService.addDeliveryshift(deliveryshift);
    this.router.navigateByUrl('deliveryShift');
  }

  updateDeliveryshift() {
    const deliveryshift: Deliveryshift = this.form.value;
    deliveryshift.id = this.deliveryshift.id;
    this.DeliveryShiftService.updateDeliveryshift(deliveryshift);
    this.form.reset();
    this.router.navigateByUrl('deliveryShift');
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('deliveryShift');
  }
}

export class Datepicker {}

