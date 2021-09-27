import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-deliveries-limit',
  templateUrl: './update-deliveries-limit.component.html',
  styleUrls: ['./update-deliveries-limit.component.scss']
})
export class UpdateDeliveriesLimitComponent implements OnInit {

  form: FormGroup;
  id: number;
  loading = false;
  deliveryshift: Deliveryshift = {} as Deliveryshift;
  deliveryshifts: Observable<Deliveryshift[]>
  submitted = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private DeliveryshiftService: DeliveryshiftService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      shiftLimit: ['', [Validators.required]],
    }, formOptions);
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
  }

  updateDeliveryshift() {
    const deliveryshift: Deliveryshift = this.form.value;
    deliveryshift.shiftId = this.deliveryshift.shiftId;
    const deliveryshiftS: Deliveryshift = this.form.value;
    //below needs to be changed
    deliveryshiftS.employeeShiftId = this.deliveryshift.employeeShiftId;
    console.log("deliveryshift", deliveryshift);
    this.DeliveryshiftService.UpdateDeliveryShift(deliveryshift).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('deliveryShift');
    });
    this.snack.open('Successfully Updated Delivery Shift Limit! ', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('home');
  }

}
