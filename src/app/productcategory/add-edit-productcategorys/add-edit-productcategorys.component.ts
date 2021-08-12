import { ProductcategoryService } from 'src/app/services/productcategory/productcategory.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productcategory } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-productcategorys',
  templateUrl: './add-edit-productcategorys.component.html',
  styleUrls: ['./add-edit-productcategorys.component.scss']
})

export class AddEditProductcategorysComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    productcategory: Productcategory;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ProductcategoryService: ProductcategoryService
    ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        id: ['', [Validators.required]],
        productCategoryName: ['', [Validators.required, Validators.maxLength(50)]],
       }, formOptions);

    if (!this.isAddMode) {
      this.productcategory = this.ProductcategoryService.getProductcategoryById(this.id);

        this.form = this.formBuilder.group({
        id: [this.productcategory.id, Validators.required],
        productCategoryName: [this.productcategory.productCategoryName, [Validators.required, Validators.maxLength(50)]],
        }, formOptions);
    }
  }


  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createProductcategory();
    } else {
        this.updateProductcategory();
    }
  }

  createProductcategory() {
    const productcategory: Productcategory = this.form.value;
    this.ProductcategoryService.addProductcategory(productcategory);
    this.router.navigateByUrl('productCategory');
  }

  updateProductcategory() {
    const productcategory: Productcategory = this.form.value;
    productcategory.id = this.productcategory.id;
    this.ProductcategoryService.updateProductcategory(productcategory);
    this.form.reset();
    this.router.navigateByUrl('productCategory');
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('productCategory');
  }
}
