import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StockTake } from 'src/app/interfaces';

@Component({
  selector: 'app-stock-take-page',
  templateUrl: './stock-take-page.component.html',
  styleUrls: ['./stock-take-page.component.scss']
})
export class StockTakePageComponent implements OnInit {form: FormGroup;
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
    this.router.navigateByUrl('stockTake');
  }

}
