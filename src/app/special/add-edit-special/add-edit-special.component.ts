import { SpecialService } from 'src/app/services/special/special.service';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Special } from 'src/app/interfaces';

@Component({
  selector: 'app-add-edit-special',
  templateUrl: './add-edit-special.component.html',
  styleUrls: ['./add-edit-special.component.scss']
})
export class AddEditSpecialComponent implements OnInit {

    form: FormGroup;
    id: number;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    special: Special;

  constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private SpecialService: SpecialService,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.isAddMode = !this.id;

    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
      specialImage: ['', [Validators.required]],
      specialDescription: ['', [Validators.required]],
      specialPrice: ['', [Validators.required]],
      specialStartDate: ['', [Validators.required]],
      specialEndDate: ['', [Validators.required]],
    }, formOptions);

    if (!this.isAddMode) {
      this.special = this.SpecialService.getSpecialById(this.id);

        this.form = this.formBuilder.group({
          specialImage: [this.special.specialImage, [Validators.required]],
          specialDescription: [this.special.specialDescription, [Validators.required]],
          specialPrice: [this.special.specialPrice, [Validators.required]],
          specialStartDate: [this.special.specialStartDate, [Validators.required]],
          specialEndDate: [this.special.specialEndDate,[Validators.required]],
    }, formOptions);
    }
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createSpecial();
    } else {
        this.updateSpecial();
    }
  }

  createSpecial() {
    const special: Special = this.form.value;
    this.SpecialService.addSpecial(special);
    this.router.navigateByUrl('specialAdd');
  }

  updateSpecial() {
    const special: Special = this.form.value;
    special.id = this.special.id;
    this.SpecialService.updateSpecial(special);
    this.form.reset();
    this.router.navigateByUrl('specialEdit');
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('special');
  }

}
