import { CategorytypeService } from 'src/app/services/categorytype/categorytype.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categorytype } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-categorytypes',
  templateUrl: './add-edit-categorytypes.component.html',
  styleUrls: ['./add-edit-categorytypes.component.scss']
})

export class AddEditCategorytypesComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    categorytype: Categorytype;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private CategorytypeService: CategorytypeService
    ) {}

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
        categoryType: ['', [Validators.required, Validators.maxLength(50)]],
        productCategoryName: ['', [Validators.required, Validators.maxLength(50)]],
    }, formOptions);

    if (!this.isAddMode) {
      this.categorytype = this.CategorytypeService.getCategorytypeById(this.id);

        this.form = this.formBuilder.group({
        categoryType: [this.categorytype.categoryType, [Validators.required, Validators.maxLength(50)]],
        productCategoryName: [this.categorytype.productCategoryName, [Validators.required, Validators.maxLength(50)]],
        }, formOptions);
    }
  }

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
  }

  createCategorytype() {
    const categorytype: Categorytype = this.form.value;
    this.CategorytypeService.addCategorytype(categorytype);
    this.router.navigateByUrl('categoryType');
  }

  updateCategorytype() {
    const categorytype: Categorytype = this.form.value;
    categorytype.id = this.categorytype.id;
    this.CategorytypeService.updateCategorytype(categorytype);
    this.form.reset();
    this.router.navigateByUrl('categoryType');
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('categoryType');
  }
}
