import { StockTakeService } from './../../services/admin/stock-take/stock-take.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { StockTake } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.scss']
})
export class StockTakeComponent implements OnInit {
  loading = false;
  submitted = false;
  isHidden: boolean = true;
  collection = [];
  selected: string;
  stockTakes: StockTake[] = [];
  StockTake: Observable<StockTake[]>;
  dataSource = new MatTableDataSource<StockTake>();
  displayedColumns: string[] = ['productItem', 'quantity', 'reason'];

  constructor(
    stockTakeService: StockTakeService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCollection();
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/CategoryType/GetCategoryType').subscribe((res: any) => {
        this.collection = res;
        //console.log = res;
      }, error => {
        console.log({ error });
      })
  }

  showProducts(){
    this.isHidden = false;
  }
}
