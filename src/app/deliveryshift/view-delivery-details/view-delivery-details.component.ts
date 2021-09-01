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
  selector: 'app-view-delivery-details',
  templateUrl: './view-delivery-details.component.html',
  styleUrls: ['./view-delivery-details.component.scss']
})
export class ViewDeliveryDetailsComponent implements OnInit {

  id: number;
  sale: OnlineSales = {} as OnlineSales;
  collection = [];
  selected: string;
  public sales: any = [];
  // id: number;
  loading = false;

  constructor(private OnlineSalesService: OnlineSalesService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.getCollection();

    this.OnlineSalesService.ViewSale(this.id).subscribe(res => {
      this.sale = res
      console.log(res)
    });
  }

  getCollection() {
    this.http
      .get<any>('https://localhost:44393/api/Sale/ViewAllSales').subscribe((res: any) => {
        this.sale = res.filter(sale => {
          return sale.saleID == this.id;
        })[0]
        // console.log("check", this.sale)
      }, error => {
        console.log({ error });
      })
  }

  Close() {
    this.router.navigateByUrl('viewDeliveryShiftSchedule');
  }

}
