//import { ReceiveSupplierOrder } from './../../interfaces/index';
import { ReceiveSupplierService } from './../../services/supplier/receive-supplier-order';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ReceiveSupplierOrder } from 'src/app/interfaces';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CaptureOrderComponent } from './capture-order/capture-order.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';


@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.scss']
})
export class ReceiveSupplierOrderComponent implements OnInit {

  //search code
  ReceiveSupplierOrder: ReceiveSupplierOrder[];
  searchValue: string;
  dataNotFound: boolean;

  displayedColumns: string[] = ['supplierName', 'supplierOrderStatusDesc', 'supplierOrderTotal', 'viewOrder', 'invoice'];
  receiveSupplierOrders: ReceiveSupplierOrder[] = [];
  receiveSupplierOrder: Observable<ReceiveSupplierOrder[]>;
  dataSource = new MatTableDataSource<ReceiveSupplierOrder>();
  form: FormGroup;
  id: any;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  supplier = [];
  //selected: string;
  recievesupplierorder: ReceiveSupplierOrder;
  // recievesupplierorders: Observable<ReceiveSupplierOrder[]>;
  RecieveSupplierOrder: ReceiveSupplierOrder[];

  constructor(
    private receiveSupplierService: ReceiveSupplierService,
    private route: Router,
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.readSupplierOrder();
    this.getSupplier();

    this.receiveSupplierService.ReceiveSupplierOrder().subscribe((result: ReceiveSupplierOrder[]) => {
      this.receiveSupplierOrders = result;
    })
  }
  getSupplier() {
    this.http
      .get<any>('https://localhost:44393/api/Supplier/GetSupplier').subscribe((res: any) => {
        this.supplier = res;
        console.log(res);
      }, error => {
        console.log({ error });
      })
  }

  filter() {

    const filter = (e) => {

      return e.supplierName && e.supplierName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.supplierOrderStatusDesc && e.supplierOrderStatusDesc.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.receiveSupplierOrders.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)


    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  readSupplierOrder(): void {
    this.receiveSupplierService.ReceiveSupplierOrder().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

 

showInvoice(){
  
}
}
