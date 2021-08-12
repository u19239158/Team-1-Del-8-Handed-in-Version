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
    productitem: Productitem;
    productitems: Observable<Productitem[]>

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
        id: ['', [Validators.required]],
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        cost: ['', [Validators.required, Validators.maxLength(10)]],
        quantity: ['', [Validators.required, Validators.maxLength(13)]],
       }, formOptions);

    if (!this.isAddMode) {
      this.ProductitemService.getProductItemByID(this.id). subscribe(res => {
        this.productitem = res
        console.log(res)
        this.form = this.formBuilder.group({
          id: [this.productitem.id, [Validators.required]],
          name: [this.productitem.name, [Validators.required]],
          description: [this.productitem.description, [Validators.required]],
          cost: [this.productitem.cost, [Validators.required, Validators.maxLength(10)]],
          quantity: [this.productitem.quantity, [Validators.required, Validators.maxLength(13)]],
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
    productitem.id = this.productitem.id;
    this.ProductitemService.UpdateProductItem(productitem).subscribe(res => {
      console.log(res)
      this.form.reset();
      this.router.navigateByUrl('productItem');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('productItem');
  }
}
