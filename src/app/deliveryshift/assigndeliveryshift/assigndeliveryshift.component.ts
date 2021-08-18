import { Component, OnInit } from '@angular/core';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Deliveryshift } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-assigndeliveryshift',
  templateUrl: './assigndeliveryshift.component.html',
  styleUrls: ['./assigndeliveryshift.component.scss']
})
export class AssigndeliveryshiftComponent implements OnInit {

   form: FormGroup;
   id: number;
   isAddMode: boolean;
   loading = false;
   submitted = false;
   // assigneeshift: Assigneeshift;
   // assigneeshifts: Observable<Delivery[]>
  collection = [];
  selected: string;

constructor(
     private formBuilder: FormBuilder,
     private route: ActivatedRoute,
     private router: Router,
     private DeliveryshiftService: DeliveryshiftService,
    private http:HttpClient,
) {}

   ngOnInit(): void {
     this.id = +this.route.snapshot.params['id'];
     this.getCollection();

     const formOptions: AbstractControlOptions = { };
     this.form = this.formBuilder.group({
         employeeId: ['', [Validators.required]],
         }, formOptions);
   }
   onSubmit() {

     if (this.form.invalid) {
       return;
     }

     this.loading = true;
     // this.updateDeliveryshift();
 }

 getCollection() {
  this.http
    .get<any>('https://localhost:44393/api/Employee/GetEmployee').subscribe((res: any) => {
      this.collection = res;
      console.log(res);
    }, error => {
      console.log({ error });
    })
}

   // updateDeliveryshift() {
   //   throw new Error('Method not implemented.');
   // }

  //  createAssignDeliveryShift() {
  //   const deliveryshift: Deliveryshift = this.form.value;
  //   this.DeliveryShiftService.CreateAssignDeliveryShift(deliveryshift).subscribe(res => {
  //     console.log(res)
  //     this.loading = false
  //     this.router.navigateByUrl('deliveryShift');
  //   });
  // }

   Close() {
     this.form.reset();
     this.router.navigateByUrl('deliveryShift');
   }
}



