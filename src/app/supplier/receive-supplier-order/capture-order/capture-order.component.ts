import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { ReceiveSupplierOrder } from 'src/app/interfaces';
import { ReceiveSupplierService } from 'src/app/services/supplier/receive-supplier-order';
import { QuantityReceivedComponent } from '../quantity-received/quantity-received.component';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';

@Component({
  selector: 'app-capture-order',
  templateUrl: './capture-order.component.html',
  styleUrls: ['./capture-order.component.scss']
})
export class CaptureOrderComponent implements OnInit {
  displayedColumns: string[] = ['checkbox', 'productItemName', 'quantityOnHand'];
  dataSource = new MatTableDataSource<ReceiveSupplierOrder>();
  RecieveSupplierOrder: ReceiveSupplierOrder[];
  recievesupplierorder: ReceiveSupplierOrder;
  receiveSupplierOrders: ReceiveSupplierOrder[] = [];
  path: File;
  SupplierOrderId: any;
  id: number;

  constructor(
    private receiveSupplierService: ReceiveSupplierService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private storage : AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.readSupplierOrder(this.id);
  
    this.receiveSupplierService.ReceiveSupplierOrder().subscribe((result: ReceiveSupplierOrder[]) => {
      this.receiveSupplierOrders = result;
    })
  }

  readSupplierOrder(SupplierOrderId:any): void {
    this.receiveSupplierService.getSupplierOrderByID(this.id).subscribe(res => {
      console.log(res);
      this.dataSource = new MatTableDataSource(res)
    })
  }

  async upload(event) {    
    this.path = event.target.files[0]
  }

  async uploadImage(){
    const key = `/files${Math.random()}${this.path.name}`;
    console.log(this.path)
     await this.storage.upload(key, this.path);
  
    const fileref = this.storage.ref(key);

    const downloadUrl = fileref.getDownloadURL();
    return downloadUrl;

  }
  
  AddQuantity() {
    const confirm = this.dialog.open(QuantityReceivedComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      this.router.navigateByUrl('captureOrder');
    })
  }

  Close(){
    this.router.navigateByUrl("receiveSupplierOrder");
  }
}
