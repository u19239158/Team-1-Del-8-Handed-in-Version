import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WriteOffStock } from 'src/app/interfaces';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('writeOffStock');
  }
}
