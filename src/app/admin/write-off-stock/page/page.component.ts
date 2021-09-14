import { MatSnackBar } from '@angular/material/snack-bar';
import { Productitem } from './../../../interfaces/index';
//import { WriteOffStock } from './../../../interfaces/index';
import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { WriteOffStock } from 'src/app/interfaces';
import { WriteOffStockService } from 'src/app/services/admin/write-off-stock/write-off-stock.service';
import { Observable } from 'rxjs';

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
  productitem: Productitem;
  productitems: Observable<Productitem[]>;
  submitted = false;

  // formBuilder: any;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private snack : MatSnackBar,
    private WriteOffStockService : WriteOffStockService,
    private formBuilder : FormBuilder,
  ) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
      writeOffReason: ['', [Validators.required, Validators.maxLength(50)]],
      writeOffQuantity: ['', [Validators.required]], 
    }
    , formOptions)
    this.id = +this.route.snapshot.params['id'];

    this.WriteOffStockService.getProductItemByID(this.id).subscribe(res => {
    this.productitem = res
    console.log(res)

    
  });
  }
  
  onSubmit() {

    if (this.form.invalid) {
      return; 
    } 
    if (this.loading = true) 
      {
        this.writeOff();
      }
  }

  writeOff() {
    const writeOffStock: WriteOffStock = this.form.value;
    writeOffStock.productItemId = this.productitem.productItemId;
    this.WriteOffStockService.WriteOffStock(writeOffStock).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('writeOffStock');
    });
    this.snack.open('Successfully Performed Write-Off! ', 'OK', 
    {
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
      duration: 2000
    });
  }


  Close() {
    this.form.reset();
    this.router.navigateByUrl('writeOffStock');
  }
}
