import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole, StockTake } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { StockTakeService } from 'src/app/services/admin/stock-take/stock-take.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-viewstocktake',
  templateUrl: './viewstocktake.component.html',
  styleUrls: ['./viewstocktake.component.scss']
})
export class ViewstocktakeComponent implements OnInit {

  searchValue: string;
  dataNotFound: boolean;
  StockTakes: StockTake[];
  stocktake: StockTake;
  stocktakes: Observable<StockTake[]>;
  dataSource = new MatTableDataSource<StockTake>();
  displayedColumns: string[] = ['Product', 'Stock-Take-Date', 'Stock-Take-Quantity'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private StockTakeService: StockTakeService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.StockTakeService.getStockTake().subscribe((result: StockTake[]) => {
      this.StockTakes = result;
      console.log(result);
      this.dataSource = new MatTableDataSource(result)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  filter() {

    const filter = (e) => {

      return e.productItemName && e.productItemName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
       e.stockTakeDate && e.stockTakeDate.toLowerCase().includes(this.searchValue.toLowerCase())
  }
  const data = (this.StockTakes.filter(filter))
  this.dataNotFound = data.length === 0
  this.dataSource = new MatTableDataSource(data)


  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }


    
  }

}


