import { Observable } from 'rxjs';
import { ProductcategoryService } from 'src/app/services/productcategory/productcategory.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Productcategory } from 'src/app/interfaces';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  path: File;
  selectedImage: File;
  url: string;
  image: string = null;
  downloadURL: Observable<string>;
  userid: number;
  imageError: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private ProductcategoryService: ProductcategoryService,
    private storage: AngularFireStorage
  ) { }


  async upload(event) {
    this.path = event.target.files[0]
  }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    console.log(obj.userId)
    this.userid = obj.userId
    console.log(obj)

    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group(
      {
        //id: ['', [Validators.required]],
        productCategoryDescription: ['', [Validators.required, Validators.maxLength(50)]],
        //productCategoryImage : this.image,
      }, formOptions);

    if (!this.isAddMode) {
      this.ProductcategoryService.getProductCategoryByID(this.id).subscribe(res => {
        this.productcategory = res
        console.log(res)
        this.form = this.formBuilder.group({
          id: [this.productcategory.productCategoryId, Validators.required],
          // productCategoryImage : this.image,
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

    if (this.isAddMode) {

      this.createProductcategory();

    } else {
      this.updateProductcategory();
    }
  }

  async uploadImage() {
    const key = `/files${Math.random()}${this.path.name}`;
    console.log(this.path)
    await this.storage.upload(key, this.path);

    const fileref = this.storage.ref(key);

    const downloadUrl = fileref.getDownloadURL();
    return downloadUrl;

  }

  async createProductcategory() {
    this.loading = true;
    const img = await this.uploadImage();
    img.subscribe(imgpath => {
      const productcategory: Productcategory = {
        ...this.form.value,
        productCategoryImage: imgpath,
        usersId: this.userid
      };

      this.ProductcategoryService.CreateProductCategory(productcategory).subscribe(res => {
        console.log(res)
        this.loading = false
        this.router.navigateByUrl('productCategory');
      });
    })

    this.snack.open('Product Category Successfully Added! ', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
  }

  async updateProductcategory() {
    if (!this.path || !this.path.name) {
      this.imageError = true;
      return
    }
    this.loading = true;
    const img = await this.uploadImage();
    img.subscribe(imgpath => {
      const productcategory: Productcategory = {
        ...this.form.value,
        productCategoryImage: imgpath,
        usersId: this.userid
      };
      productcategory.productCategoryId = this.productcategory.productCategoryId;
      this.ProductcategoryService.UpdateProductCategory(productcategory).subscribe(res => {
        console.log(res)
        this.form.reset();
        this.router.navigateByUrl('productCategory');
      });
    })

    this.snack.open('Product Category Successfully Updated! ', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('productCategory');
  }
}
