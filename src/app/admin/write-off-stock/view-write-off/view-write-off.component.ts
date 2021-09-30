import { WriteOffStock } from './../../../interfaces/index';
//import { WriteOffStockService } from './../../../services/admin/write-off-stock/write-off-stock.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRole } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
//import { WriteOffStockService } from 'src/app/services/user-role/user-role.service';
import { WriteOffStockService } from 'src/app/services/admin/write-off-stock/write-off-stock.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-view-write-off',
  templateUrl: './view-write-off.component.html',
  styleUrls: ['./view-write-off.component.scss']
})
export class ViewWriteOffComponent implements OnInit {
  searchValue: string;
  dataNotFound: boolean;
  WriteOffs: WriteOffStock[];
  writeOff: WriteOffStock;
  writeoffs: Observable<WriteOffStock[]>;
  dataSource = new MatTableDataSource<WriteOffStock>();
  displayedColumns: string[] = ['Product', 'Write-Off-Date', 'Write-Off-Reason' ,'Write-Off-Quantity'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private WriteOffStockService: WriteOffStockService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
   // this.getwriteOff();

    
    this.WriteOffStockService.getWriteOff().subscribe((result: WriteOffStock[]) => {
      this.WriteOffs = result;
      console.log(result);
      this.dataSource = new MatTableDataSource(result)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });
  }

  filter() {

    const filter = (e) => {

      return e.productItemName && e.productItemName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
       e.writtenOffStockDate && e.writtenOffStockDate.toLowerCase().includes(this.searchValue.toLowerCase()) ||
       e. writeOffReason && e. writeOffReason.toLowerCase().includes(this.searchValue.toLowerCase())
  }
  const data = (this.WriteOffs.filter(filter))
  this.dataNotFound = data.length === 0
  this.dataSource = new MatTableDataSource(data)


  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }


    
  }
}

