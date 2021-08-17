import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { WriteOffStock } from 'src/app/interfaces';
import { WriteOffStockService } from 'src/app/services/admin/write-off-stock/write-off-stock.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-write-off-stock',
  templateUrl: './write-off-stock.component.html',
  styleUrls: ['./write-off-stock.component.scss']
})
export class WriteOffStockComponent implements OnInit {
  loading = false;
  submitted = false;
  collection = [];
  selected: string;
  writeOffStocks: WriteOffStock[] = [];
  writeOffStock: Observable<WriteOffStock[]>;
  dataSource = new MatTableDataSource<WriteOffStock>();
  displayedColumns: string[] = ['productItem', 'quantity', 'reason'];
  
  constructor(writeOffStockService: WriteOffStockService
  ) { }

  ngOnInit(): void {
  }
Close(){

}
}
