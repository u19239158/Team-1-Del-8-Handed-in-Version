import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OnlineSales } from 'src/app/interfaces';

@Component({
  selector: 'app-search-online-sales',
  templateUrl: './search-online-sales.component.html',
  styleUrls: ['./search-online-sales.component.scss']
})
export class SearchOnlineSalesComponent implements OnInit {
  form: FormGroup;
  id : number;
  loading = false;
  isHidden: boolean = true;
  collection = [];
  selected: string;
  dataSource = new MatTableDataSource<OnlineSales>();
  displayedColumns: string[] = ['saleNumber', 'saleDate','orderStatus','actions'];

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private http: HttpClient,
    //private WriteOffStockService : WriteOffStockService,
    //private FormBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    this.getCollection();
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/OrderStatus/GetOrderStatus').subscribe((res: any) => {
        this.collection = res;
        console.log(res);
      }, error => {
        console.log({ error });
      })
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
  }

  Search(){
    this.isHidden = false;
  }
  Close() {
    this.form.reset();
    this.router.navigateByUrl('writeOffStock');
  }

}
