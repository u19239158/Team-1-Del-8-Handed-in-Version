//import { StockTakeService } from './../../../services/admin/stock-take/stock-take.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
//import { StockTake } from 'src/app/interfaces';
import { Productitem, StockTake } from './../../../interfaces/index';
import { Observable } from 'rxjs';
import { StockTakeService } from 'src/app/services/admin/stock-take/stock-take.service';

@Component({
  selector: 'app-stock-take-page',
  templateUrl: './stock-take-page.component.html',
  styleUrls: ['./stock-take-page.component.scss']
})
export class StockTakePageComponent implements OnInit {
  form: FormGroup;
  id : number;
  loading = false;
  stockTake : StockTake;
  stockTakes : Observable<StockTake[]>;
  productitem: Productitem;
  productitems: Observable<Productitem[]>;
  submitted = false;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private StockTakeService : StockTakeService,
    private FormBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    const formOptions: AbstractControlOptions = { };
    this.StockTakeService.getProductItemByID(this.id).subscribe(res => {
      this.productitem = res
      console.log(res)
    this.form = this.FormBuilder.group({
      stockTakeQuantity: ['', [Validators.required]],
    }, formOptions);
  });

  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
    if (this.loading = true) 
    {
      this.doStockTake();
    }
  }


  doStockTake() {
    const stockTake: StockTake = this.form.value;
    stockTake.productItemId = this.productitem.productItemId;
    this.StockTakeService.StockTake(stockTake).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('/stockTake');
    });
  }

  Close() {
    this.form.reset();
    this.router.navigateByUrl('stockTake');
  }

}