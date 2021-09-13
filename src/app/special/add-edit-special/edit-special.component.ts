import { Observable } from 'rxjs';
import { SpecialService } from 'src/app/services/special/special.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Special, Productitem } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment'

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
  special: Special = {} as Special;
  // special: Special;
  productItem: Productitem;
  specials: Observable<Special[]>;
  collection = [];
  selected: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SpecialService: SpecialService,
    private http: HttpClient

  ) { }


  // ngOnInit(): void {

  //   this.getCollection();

  //   this.id = +this.route.snapshot.params['id'];
  //   this.SpecialService.getSpecialByID(this.id).subscribe(res =>{

  //      this.special = res
  //     console.log(res)
  //   const formOptions: AbstractControlOptions = { };
  //   this.form = this.formBuilder.group({
  //     id: [this.special.specialID, Validators.required],
  //     specialDescription: [this.special.specialDescription, [Validators.required]],
  //     discountId: [this.special.discountId, [Validators.required]],
  //     specialStartDate: [this.special.specialStartDate, [Validators.required]],
  //     specialEndDate: [this.special.specialEndDate, [Validators.required]],
  //   }, formOptions); ;})

  // }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.getCollection();
    const formOptions: AbstractControlOptions = {};
    {
      this.SpecialService.getSpecialByID(this.id).subscribe(res => {
        this.special = res;
        console.log(res)
        this.form = this.formBuilder.group({
          id: [this.special.specialID, Validators.required],
          specialDescription: [this.special.specialDescription, [Validators.required]],
          discountId: [this.special.discountId],
          // moment(this.special.specialEndDate).format('YYYY-MM-DD'), [Validators.required],
          specialStartDate: [moment(this.special.specialStartDate).format('YYYY-MM-DD'), [Validators.required]],
          specialEndDate: [moment(this.special.specialEndDate).format('YYYY-MM-DD'), [Validators.required]],
        }, formOptions);
      })

    }
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

        setTimeout(() => {
          // this.form.patchValue({ employeeId: 2 })
        }, 3000);

      }, error => {
        console.log({ error });
      })

  }


  // createSpecial() {
  //   const special: Special = this.form.value;
  //   special.productItemId = this.productItem.productItemId;
  //   special.productItemCost = this.productItem.productItemCost;
  //  // special.discountPercentage = this.collection.find(this.discountPercentage);
  //   this.SpecialService.CreateSpecial(special).subscribe(res => {
  //     console.log(res)
  //     this.loading = false
  //     this.router.navigateByUrl('special');
  //   });
  // }

  updateSpecial() {
    const special: Special = this.form.value;
    special.specialID = this.special.specialID;
    special.productItemId = this.special.productItemId;
    special.productItemCost = this.special.productItemCost;
    this.SpecialService.UpdateSpecial(special).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('special');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('special');
  }
}
