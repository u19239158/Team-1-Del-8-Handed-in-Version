import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { PlaceSupplierOrderService } from 'src/app/services/place-supplier-order/place-supplier-order.service';
import { PlaceSupplierOrder, Supplier } from 'src/app/interfaces';

@Component({
  selector: 'app-place-supplier-order',
  templateUrl: './place-supplier-order.component.html',
  styleUrls: ['./place-supplier-order.component.scss']
})
export class PlaceSupplierOrderComponent implements OnInit {
  loading = false;
  submitted = false;
  isHidden: boolean = true;
  collection = [];
  supplier = [];
  selected: string;
  placeSupplierOrders: PlaceSupplierOrder[] = [];
  placeSupplierOrder: Observable<PlaceSupplierOrder[]>;
  dataSource = new MatTableDataSource<PlaceSupplierOrder>();
  displayedColumns: string[] = ['productItem', 'quantity', 'reason'];

  constructor(
    private placeSupplierOrderService: PlaceSupplierOrderService,
    private http: HttpClient,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCollection();
    this.getSupplier()
  }

  getSupplier() {
    this.http
      .get<any>('https://localhost:44393/api/Supplier/GetSupplier').subscribe((res: any) => {
        this.supplier = res;
        console.log  (res);
      }, error => {
        console.log({ error });
      })
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

  placeOrder(){

  }
}
