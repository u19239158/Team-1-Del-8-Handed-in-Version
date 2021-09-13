//import { ReceiveSupplierOrder } from './../../interfaces/index';
import { ReceiveSupplierService } from './../../services/supplier/receive-supplier-order';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ReceiveSupplierOrder } from 'src/app/interfaces';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { QuantityModal } from '../place-supplier-order/quantity-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.scss']
})
export class ReceiveSupplierOrderComponent implements OnInit {
  displayedColumns: string[] = ['supplierName', 'productItem', 'quantity'];
  receiveSupplierOrders: ReceiveSupplierOrder[] = [];
  receiveSupplierOrder: Observable<ReceiveSupplierOrder[]>;
  dataSource = new MatTableDataSource<ReceiveSupplierOrder>();
  form: FormGroup;
  id: any;
  supplier = [];
  //selected: string;
  recievesupplierorder: ReceiveSupplierOrder;
 // recievesupplierorders: Observable<ReceiveSupplierOrder[]>;
  RecieveSupplierOrder : ReceiveSupplierOrder[];


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

   this.receiveSupplierService.ReceiveSupplierOrder().subscribe((result:ReceiveSupplierOrder[])=> {
    this.receiveSupplierOrders = result;
  })
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

  readSupplierOrder(): void {
    this.receiveSupplierService.ReceiveSupplierOrder().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  // receiveOrder(item: Item) {
  //   const confirm = this.dialog.open(QuantityModal, {
  //            disableClose: true,
  //           });

  //   confirm.afterClosed().subscribe(res => {
  //     if (res){
  //       this.receiveSupplierService.ReceiveSupplierOrder(Item).subscribe(res =>{
  //         this.readSupplierOrder()
  //       })
  //     }
  //   });
  //  }

}
