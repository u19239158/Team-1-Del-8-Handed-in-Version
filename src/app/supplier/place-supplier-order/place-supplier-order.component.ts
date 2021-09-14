import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import { PlaceSupplierOrderService } from 'src/app/services/place-supplier-order/place-supplier-order.service';
import { PlaceSupplierOrder, Productitem } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-supplier-order',
  templateUrl: './place-supplier-order.component.html',
  styleUrls: ['./place-supplier-order.component.scss']
})
export class PlaceSupplierOrderComponent implements OnInit {
  //search code
  Productitems: Productitem[];
  searchValue: string;
  dataNotFound: boolean;
  
  form: FormGroup;
  loading = false;
  submitted = false;
  collection = [];
  supplier = [];
  selected: string;
  productitems: Productitem[] = [];
  dataSource = new MatTableDataSource<Productitem>();

  placeSupplierOrders: PlaceSupplierOrder[] = [];
  placeSupplierOrder: Observable<PlaceSupplierOrder[]>;
  //dataSource = new MatTableDataSource<PlaceSupplierOrder>();
  displayedColumns: string[] = ['checked', 'productItem', 'quantity'];

  highlight(element: PlaceSupplierOrder) {
    element.highlighted = !element.highlighted;
  }
  
  constructor(
    private productitemService: ProductitemService,
    private placeSupplierOrderService: PlaceSupplierOrderService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private FormGroup: FormBuilder,
    // public dialogRef: MatDialogRef<PlaceSupplierOrder>
  ) { }

  ngOnInit(): void {

    const formOptions: AbstractControlOptions = {};
    this.form = this.FormGroup.group({
      supplierName: ['', [Validators.required, Validators.maxLength(50)]],
    }
      , formOptions)

    this.getSupplier();
    this.readProductitems();

    this.productitemService.GetProductItem().subscribe((result: Productitem[]) => {
      this.productitems = result;
    });
  }

  readProductitems(): void {
    this.productitemService.GetProductItem().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
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

  // openDialog(): void {
  //   // const dialogRef = this.dialog.open(QuantityModal, {
  //   //   width: '250px',
  //     // element: {name: this.quantity, animal: this.animal}
  //   // });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   console.log('The dialog was closed');
  //   //   //this.Quantity = result;
  //   // });
  // }


  filter() {

    const filter = (e) => {

      return e.productItemName && e.productItemName.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.Productitems.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data);
  }

  placeOrder() {
    // const dialogRef = this.dialog.open(QuantityModalComponent, {restoreFocus: false});
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
    // this.router.navigateByUrl('login');
    
  }
}
