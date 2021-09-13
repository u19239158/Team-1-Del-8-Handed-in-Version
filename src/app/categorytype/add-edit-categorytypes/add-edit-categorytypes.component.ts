import { Observable } from 'rxjs';
import { CategorytypeService } from 'src/app/services/categorytype/categorytype.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorytype } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';


@Component({
  selector: 'app-add-edit-categorytypes',
  templateUrl: './add-edit-categorytypes.component.html',
  styleUrls: ['./add-edit-categorytypes.component.scss']
})

export class AddEditCategorytypesComponent implements OnInit {
  [x: string]: any;

  form: FormGroup;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  categorytype: Categorytype;
  categorytypes: Observable<Categorytype[]>;
  collection = [];
  selected: string;
  path: string;
  selectedImage: File;
  url : string;
  image : string = null;
  downloadURL: Observable<string>;
  taskRef: AngularFireStorageReference;

  

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private CategorytypeService: CategorytypeService,
    private http: HttpClient,
    private storage : AngularFireStorage
     
  ) { }

  async upload(event) {    
    this.path = event.target.files[0]
    const filePath = 'test';
    const task = this.storage.upload('/images'+Math.random()+filePath, this.path);
    const ref = this.storage.ref(filePath);
    console.log(ref);
    // upload image, save url
    await task;
    console.log('Image uploaded!');






    this.image = await this.ref.getDownloadURL().toPromise()
    console.log(this.image)

    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      categoryTypeDescription: ['', [Validators.required, Validators.maxLength(50)]],
      categoryTypeImage : this.image,
      itemDescription: ['', [Validators.required, Validators.maxLength(50)]],
      productCategoryID: ['', [Validators.required, Validators.maxLength(50)]],

    }, formOptions);

   
    
  }
 

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;
    this.getCollection();

    
    const formOptions: AbstractControlOptions = {};
    this.form = this.formBuilder.group({
      categoryTypeDescription: ['', [Validators.required, Validators.maxLength(50)]],
      categoryTypeImage : this.image,
     // categoryTypeImage: ['', [Validators.required]],
      itemDescription: ['', [Validators.required, Validators.maxLength(50)]],
      productCategoryID: ['', [Validators.required, Validators.maxLength(50)]],
    }, formOptions);

    if (!this.isAddMode) {
      this.CategorytypeService.getCategoryTypeByID(this.id).subscribe(res => {
        this.categorytype = res
        console.log(res)
        this.form = this.formBuilder.group({
          categoryTypeImage : this.image,
          categoryTypeDescription: [this.categorytype.categoryTypeDescription, [Validators.required, Validators.maxLength(50)]],
          //categoryTypeImage: [this.image, [Validators.required]],
          itemDescription: [this.categorytype.itemDescription, [Validators.required, Validators.maxLength(50)]],
          productCategoryID: [this.categorytype.productCategoryID, [Validators.required, Validators.maxLength(50)]],
        }, formOptions);
      });
      this.form.get('productCategoryID').disable();
    }
  }

  
   
  // uploadImage(){
  //   console.log(this.path)
  //    const img =this.storage.upload('/images'+Math.random()+this.path, this.path);
  //   const fileref = this.storage.ref(this.path);

  //   //const downloadUrl = img.getDownloadURL();

  // }

    
  // chooseFile(event){
  //   this.selectedImage = event.target.files[0];
  // }

// async uploadImage(){
//   const key =`/files${Math.random()}${this.selectedImage.name}`;
//   await this.storage.upload(key,this.selectedImage);
//   const ref = this.storage.ref(key);
//   const download = ref.getDownloadURL();

//   return download;
// }

                    

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createCategorytype();
    } else {
      this.updateCategorytype();
    }
console.log(this.path)
  }

  createCategorytype() {
    const categorytype: Categorytype = this.form.value;
   
    this.CategorytypeService.CreateCategoryType(categorytype).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('categoryType');
    });
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/ProductCategory/GetProdCat').subscribe((res: any) => {
        this.collection = res;
        console.log(res);
      }, error => {
        console.log({ error });
      })

  }

  updateCategorytype() {
    const categorytype: Categorytype = this.form.value;

    categorytype.categoryTypeId = this.categorytype.categoryTypeId;
    this.CategorytypeService.UpdateCategoryType(categorytype).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('categoryType');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('categoryType');
  }
}
