//import { WriteOffStock } from './../../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WriteOffStock } from 'src/app/interfaces';
import { WriteOffStockService } from 'src/app/services/admin/write-off-stock/write-off-stock.service';
import { Observable, observable } from 'rxjs';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {
  form: FormGroup;
  id : number;
  loading = false;
  writeOffStock : WriteOffStock;
  writeOffStocks : Observable<WriteOffStock[]>;
  //formBuilder: any;


  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private WriteOffStockService : WriteOffStockService,
    private FormBuilder : FormBuilder

  ) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = { };
    this.form = this.FormBuilder.group({
      writeOffReason: ['', [Validators.required, Validators.maxLength(50)]],
      writeOffQuantity: ['', [Validators.required]],
      productItemId :['', [Validators.required]]
    }, formOptions);
  }

  

  onSubmit() {

    if (this.form.invalid) {
      return; 
    } 
    if (this.loading = true) 
      {
       return this.writeOff();
      }
  }

  writeOff() {
    const WriteOffStock: WriteOffStock = this.form.value;
    this.WriteOffStockService.WriteOffStock(WriteOffStock).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('writeOffStock');
    });
  }


  Close() {
    this.form.reset();
    this.router.navigateByUrl('writeOffStock');
  }
}
