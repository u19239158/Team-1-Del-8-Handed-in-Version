import { Observable } from 'rxjs';
import { SpecialService } from 'src/app/services/special/special.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Special, Productitem } from 'src/app/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-edit-special',
  templateUrl: './edit-special.component.html',
  styleUrls: ['./edit-special.component.scss']
})
export class EditSpecialComponent implements OnInit {

  form: FormGroup;
  id: number;
  discountPercentage: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  special: Special;
  //productItem :Productitem;
  specials: Observable<Special[]>;
  collection = [];
  selected: string;
  productItem: Productitem = {} as Productitem;
  minDate: Date;
  selectedDate = new Date();
  selectedStartDate = new Date();
  endDateEnabled: boolean = false;
  userid: number;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar,
    private SpecialService: SpecialService,
    private http: HttpClient

  ) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date();
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    //this.isAddMode = !this.id;
    this.getCollection();
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    console.log(obj.userId)
    this.userid = obj.userId
    console.log(obj)

    this.collection

    this.SpecialService.getItemByID(this.id).subscribe(res => {
      this.productItem = res
      console.log(res)
    });



    const formOptions: AbstractControlOptions = {};
    this.SpecialService.getSpecialByID(this.id).subscribe(res => {
      this.special = res
      console.log(res)
      this.form = this.formBuilder.group({
        //specialImage: ['', [Validators.required]],
        specialDescription: [this.special.specialDescription, [Validators.required]],
        discountId: [this.special.discountId, [Validators.required]],
        // discountPercentage: [0,[Validators.required]],
        //productItemId: [this.special.productItemId,[Validators.required] ],
        specialStartDate: [this.special.specialStartDate, [Validators.required]],
        specialEndDate: [this.special.specialEndDate, [Validators.required]],
      }, formOptions);
    });
  }


  onStartDateChange(type: string, event: MatDatepickerInputEvent<Date>) {
    this.selectedStartDate = moment(event.value).toDate();
    this.endDateEnabled = true;
  }


  onSubmit() {

    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.updateSpecial();


    // if (this.isAddMode) {
    //     this.createSpecial();
    // } else {
    //     this.updateSpecial();
    // }
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/Discount/GetDiscount').subscribe((res: any) => {
        this.collection = res;
      }, error => {
        console.log({ error });
      })

  }



  updateSpecial() {
    const special: Special = this.form.value;
    special.usersId = this.userid
    special.productItemId = this.productItem.productItemId;
    special.productItemCost = this.productItem.productItemCost;
    this.SpecialService.UpdateSpecial(special).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('special');
    });
    this.snack.open('Special Successfully Updated! ', 'OK',
      {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 2000
      });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('special');
  }
}
