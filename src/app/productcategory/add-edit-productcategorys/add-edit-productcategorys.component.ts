import { Observable } from 'rxjs';
import { ProductcategoryService } from 'src/app/services/productcategory/productcategory.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productcategory } from 'src/app/interfaces';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-add-edit-productcategorys',
  templateUrl: './add-edit-productcategorys.component.html',
  styleUrls: ['./add-edit-productcategorys.component.scss']
})
export class AddEditProductcategorysComponent implements OnInit {

    form: FormGroup;
    id: number;
    isHidden: boolean = true;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    productcategory: Productcategory;
    productcategorys: Observable<Productcategory[]>
    path: string;
    selectedImage: File;
    url : string;
    image : string = null;
    downloadURL: Observable<string>;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private ProductcategoryService: ProductcategoryService,
        private storage : AngularFireStorage
    ) {}


    async upload(event) {    
      this.path = event.target.files[0]
      const filePath = 'test';
      const task = this.storage.upload('/images'+Math.random()+filePath, this.path);
      const ref = this.storage.ref(filePath);
      // upload image, save url
      await task;
      console.log('Image uploaded!');
      this.image = await ref.getDownloadURL().toPromise();
      console.log( this.image)
  
      const formOptions: AbstractControlOptions = {};
      this.form = this.formBuilder.group({
        productCategoryImage : this.image,

        productCategoryDescription: ['', [Validators.required, Validators.maxLength(50)]],
  
      }, formOptions);
      
    }
    
  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
  
    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group(
      {
        //id: ['', [Validators.required]],
        productCategoryDescription: ['', [Validators.required, Validators.maxLength(50)]],
        productCategoryImage : this.image,
       }, formOptions);

    if (!this.isAddMode) {
      this.ProductcategoryService.getProductCategoryByID(this.id).subscribe(res => {
        this.productcategory = res
        console.log(res)
        this.form = this.formBuilder.group({
          id: [this.productcategory.productCategoryId, Validators.required],
          productCategoryImage : this.image,
          productCategoryDescription: [this.productcategory.productCategoryDescription, [Validators.required, Validators.maxLength(50)]],
         // productCategoryImage: [this.productcategory.productCategoryImage, []]
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
        this.createProductcategory();
    } else {
        this.updateProductcategory();
    }
  }

  createProductcategory() {
    const productcategory: Productcategory = this.form.value;
    this.ProductcategoryService.CreateProductCategory(productcategory).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('productCategory');
    });
  }

  updateProductcategory() {
    const productcategory: Productcategory = this.form.value;
    productcategory.productCategoryId = this.productcategory.productCategoryId;
    this.ProductcategoryService.UpdateProductCategory(productcategory).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('productCategory');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('productCategory');
  }
}
