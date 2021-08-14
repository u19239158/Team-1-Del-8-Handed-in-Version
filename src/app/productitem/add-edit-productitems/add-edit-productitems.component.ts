import { Observable } from 'rxjs';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productitem } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-productitems',
  templateUrl: './add-edit-productitems.component.html',
  styleUrls: ['./add-edit-productitems.component.scss']
})

export class AddEditProductitemsComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    Productitem: Productitem;
    productitem: Observable<Productitem[]>

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ProductitemService: ProductitemService
    ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        //id: ['', [Validators.required]],
        productItemName: ['', [Validators.required]],
        //description: ['', [Validators.required]],
        productItemCost: ['', [Validators.required ]],
        productItemQuantityOnHand: ['', [Validators.required, Validators.maxLength(13)]],
       }, formOptions);

    if (!this.isAddMode) {
      this.ProductitemService.getProductItemByID(this.id). subscribe(res => {
        this.Productitem = res
        console.log(res)
        this.form = this.formBuilder.group({
          //id: [this.Productitem.productItemId, [Validators.required]],
          productItemName: [this.Productitem.productItemName, [Validators.required]],
         // productItemDescription: [this.productitem.description, [Validators.required]],
          productItemCost: [this.Productitem.productItemCost, [Validators.required ]],
         // productItemQuantityOnHand: [this.productitem.quantity, [Validators.required, Validators.maxLength(13)]],
          }, formOptions);
      })
    }
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createProductitem();
    } else {
        this.updateProductitem();
    }
  }

  createProductitem() {
    const productitem: Productitem = this.form.value;
    this.ProductitemService.CreateProductItem(productitem).subscribe (res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('productItem');
    });
  }

  updateProductitem() {
    const productitem: Productitem = this.form.value;
    productitem.productItemId = this.Productitem.productItemId;
    this.ProductitemService.UpdateProductItem(productitem).subscribe(res => {
      console.log(res)
      //this.form.reset();
      this.router.navigateByUrl('productItem');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('productItem');
  }
}
