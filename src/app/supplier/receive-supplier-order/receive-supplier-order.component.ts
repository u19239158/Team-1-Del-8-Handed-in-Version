//import { ReceiveSupplierOrder } from './../../interfaces/index';
import { ReceiveSupplierService } from './../../services/supplier/receive-supplier-order';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ReceiveSupplierOrder } from 'src/app/interfaces';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-receive-supplier-order',
  templateUrl: './receive-supplier-order.component.html',
  styleUrls: ['./receive-supplier-order.component.scss']
})
export class ReceiveSupplierOrderComponent implements OnInit {
  displayedColumns: string[] = ['id', 'orderDatePlaced', 'orderDateReceived', 'invoiceNumber', 'invoiceDate', 'invoiceTotal','actions'];
  receiveSupplierOrders: ReceiveSupplierOrder[] = [];
  receiveSupplierOrder: Observable<ReceiveSupplierOrder[]>;
  dataSource = new MatTableDataSource<ReceiveSupplierOrder>();
  form: FormGroup;
  id: any;
  recievesupplierorder: ReceiveSupplierOrder;
 // recievesupplierorders: Observable<ReceiveSupplierOrder[]>;
  RecieveSupplierOrder : ReceiveSupplierOrder[];


  constructor(
    private receiveSupplierService: ReceiveSupplierService,
    private route: Router,
    private formBuilder: FormBuilder,
    private router: Router,
  
  ) { }

  ngOnInit(): void {
   this.readSuppliers();

   this.receiveSupplierService.ReceiveSupplierOrder().subscribe((result:ReceiveSupplierOrder[])=> {
    this.receiveSupplierOrders = result;
  })
    }


  readSuppliers(): void {
    this.receiveSupplierService.ReceiveSupplierOrder().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
    //this.dataSource = new MatTableDataSource<Supplier>(this.supplierService.getAll());
  }

}
