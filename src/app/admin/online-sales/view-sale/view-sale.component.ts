import { OnlineSales } from 'src/app/interfaces';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';

@Component({
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.scss']
})

// productItemName: string;
//   //productItemDescription:string;
//   productItemCost: number;
//   quantityOnHand: number;

// onlineSale: OnlineSales;
// onlineSales: Observable<OnlineSales[]>;
// dataSource = new MatTableDataSource<OnlineSales>();
// displayedColumns: string[] = ['productItemName','quantityOnHand'];
// OnlineSales: OnlineSales[];

export class ViewSaleComponent implements OnInit {
  id: number;
  sale: OnlineSales = {} as OnlineSales;
  collection = [];
  selected: string;

  constructor(private OnlineSalesService: OnlineSalesService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient
  ) { }


  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getCollection();
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/Sale/ViewAllSales').subscribe((res: any) => {
        this.sale = res.filter(sale => {
          return sale.saleID == this.id;
        })[0]
        console.log("check", this.sale)
      }, error => {
        console.log({ error });
      })
  }

  Close() {
    this.router.navigateByUrl('onlineSales');
  }

}
