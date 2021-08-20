import { Observable } from 'rxjs';
import { CourierService } from 'src/app/services/courier/courier.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Courier } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';

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
    collection = [];
    selected: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private CourierService: CourierService,
        private http: HttpClient    
    ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getCollection();

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
      courierName: ['', [Validators.required]],
      courierTypeID: ['', [Validators.required]],
      courierEmail: ['', [Validators.required, Validators.email]],
      courierNumber: ['', [Validators.required, Validators.maxLength(10)]],
      }, formOptions);

    if (!this.isAddMode) {
      this.CourierService.getCourierByID(this.id).subscribe(res => {
        this.courier = res
        console.log(res)
        this.form = this.formBuilder.group({
          courierName: [this.courier.courierName, [Validators.required]],
          courierTypeID: [this.courier.courierTypeID, [Validators.required]],
          courierEmail: [this.courier.courierEmail, [Validators.required, Validators.email]],
          courierNumber: [this.courier.courierNumber, [Validators.required, Validators.maxLength(10)]],
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
  
  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/CourierType/GetCourierType').subscribe((res: any) => {
        this.collection = res;
        //console.log = res;
      }, error => {
        console.log({ error });
      })
  }



  updateCourier() {
    const courier: Courier = this.form.value;
    courier.courierID = this.courier.courierID;
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
