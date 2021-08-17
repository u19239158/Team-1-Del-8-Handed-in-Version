import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CategorytypeService } from 'src/app/services/categorytype/categorytype.service';
import { Categorytype } from 'src/app/interfaces';

@Component({
  selector: 'app-stock-take',
  templateUrl: './stock-take.component.html',
  styleUrls: ['./stock-take.component.scss']
})
export class StockTakeComponent implements OnInit {
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
