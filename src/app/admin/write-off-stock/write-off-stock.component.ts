import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategorytypeService } from 'src/app/services/categorytype/categorytype.service';
import { Categorytype } from 'src/app/interfaces';

@Component({
  selector: 'app-write-off-stock',
  templateUrl: './write-off-stock.component.html',
  styleUrls: ['./write-off-stock.component.scss']
})
export class WriteOffStockComponent implements OnInit {
  loading = false;
  submitted = false;
  dataSource = new MatTableDataSource<Categorytype>();
  displayedColumns: string[] = ['productItem', 'quantity', 'reason'];
  
  constructor(categoryTypeService: CategorytypeService
  ) { }

  ngOnInit(): void {
  }
Close(){

}
}
