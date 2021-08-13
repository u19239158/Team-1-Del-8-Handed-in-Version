import { Observable } from 'rxjs';
import { CourierService } from 'src/app/services/courier/courier.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Courier } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-courier',
  templateUrl: './add-edit-courier.component.html',
  styleUrls: ['./add-edit-courier.component.scss']
})

export class AddEditCourierComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    courier: Courier;
    couriers: Observable<Courier[]>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private CourierService: CourierService
    ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        contactNumber: ['', Validators.required, Validators.maxLength(10)],
        }, formOptions);

    if (!this.isAddMode) {
      this.CourierService.getCourierByID(this.id).subscribe(res => {
        this.courier = res
        console.log(res)
        this.form = this.formBuilder.group({
          name: [this.courier.name, [Validators.required]],
          type: [this.courier.type, [Validators.required]],
          email: [this.courier.email, [Validators.required, Validators.email]],
          contactNumber: [this.courier.contactNumber, [Validators.required, Validators.maxLength(10)]],
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
        this.createCourier();
    } else {
        this.updateCourier();
    }
  }

  createCourier() {
    const courier: Courier = this.form.value;
    this.CourierService.CreateCourier(courier).subscribe(res => {
      console.log(res)
      this.loading = false;
      this.router.navigateByUrl('couriers');
    });
  }

  updateCourier() {
    const courier: Courier = this.form.value;
    courier.id = this.courier.id;
    this.CourierService.UpdateCouriere(courier).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('couriers');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('couriers');
  }
}
