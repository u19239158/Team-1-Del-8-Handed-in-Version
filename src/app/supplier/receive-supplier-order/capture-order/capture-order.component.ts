import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { place, ReceiveSupplierOrder } from 'src/app/interfaces';
import { ReceiveSupplierService } from 'src/app/services/supplier/receive-supplier-order';
import { QuantityReceivedComponent } from '../quantity-received/quantity-received.component';
import { AngularFireStorage, AngularFireStorageReference } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-capture-order',
  templateUrl: './capture-order.component.html',
  styleUrls: ['./capture-order.component.scss']
})
export class CaptureOrderComponent implements OnInit {
  displayedColumns: string[] = ['checkbox', 'productItemName', 'quantityOnHand'];
  dataSource = new MatTableDataSource<ReceiveSupplierOrder>();
  ReceiveSupplierOrder: ReceiveSupplierOrder[];
  receivesupplierorder: ReceiveSupplierOrder;
  receiveSupplierOrders: ReceiveSupplierOrder[] = [];
  userid: number;
  path: File;
  SupplierOrderId: any;
  imageError: boolean;
  id: number;
  public list: place[] = [];
  quant: number;
  supplierId: number;
  loading = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  form = this.FB.group({
    invoiceTotal: [null, Validators.required],

  })

  checkboxes = {};

  constructor(
    private receiveSupplierService: ReceiveSupplierService,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog,
    private storage: AngularFireStorage,
    private route: ActivatedRoute,
    private router: Router,
    private FB: FormBuilder,
    private snack: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.params['id'];
    this.readSupplierOrder(this.id);

    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    this.userid = obj.userId
  }

  readSupplierOrder(SupplierOrderId: any): void {
    this.receiveSupplierService.getSupplierOrderByID(this.id).subscribe(res => {
      this.supplierId = res[0].supplierID;
      this.SupplierOrderId = res[0].supplierOrderID;

      this.dataSource = new MatTableDataSource(res)
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  AddInvoiceQuantity(supplierProducts: string, productItemId: number, checked: boolean) {

    if (checked) {
      for (let i = 0; i < this.list.length; i++) {
        const product = this.list[i];
        if (product.id === productItemId) {
          this.list.splice(i, 1)
          return
        }
      }
    }

    const confirm = this.dialog.open(QuantityReceivedComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {

      if (res) {
        // this.QuantityModalComponent.content.event.subscribe(res => {

        var num = localStorage.getItem('invoiceQuantity');
        const q = JSON.parse(num);
        this.quant = q;

        this.list.push({ name: supplierProducts, quantity: this.quant, id: productItemId });
      }
      // this.router.navigateByUrl('placeSupplierOrder');
    })
  }

  onSubmit() {

    if (this.form.invalid) {
      return;
    }

    this.loading = true;

  }


  async upload(event) {
    this.path = event.target.files[0]
  }

  async uploadImage() {
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

  Close() {
    this.router.navigateByUrl("receiveSupplierOrder");
  }

  async finalOrder() {
    const receiveOrder: ReceiveSupplierOrder = this.form.value;
    receiveOrder.usersId = this.userid
    if (!this.path || !this.path.name) {
      this.imageError = true;
      return
    }
    this.loading = true;
    const img = await this.uploadImage();

    img.subscribe(imgpath => {
      const Data = {
        supplierInvoiceTotal: receiveOrder.invoiceTotal,
        InvoiceLineList: this.list,
        supplierId: this.supplierId,
        supplierOrderId: this.SupplierOrderId,
        usersid: receiveOrder.usersId,
        supplierInvoicePdf: imgpath
      }
      this.receiveSupplierService.ReceiveSupplierOrder(Data).subscribe(res => {
        console.log(res)
        this.loading = false
        this.router.navigateByUrl('receiveSupplierOrder')
      })
      this.snack.open('Order Successfully Captured! ', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    })




    // const Data = {
    //   supplierInvoiceTotal : receiveOrder.invoiceTotal,
    //   InvoiceLineList : this.list,
    //   supplierId: this.supplierId,
    //   supplierOrderId: this.SupplierOrderId,
    //   usersid : receiveOrder.usersId,
    // }


  }



}
