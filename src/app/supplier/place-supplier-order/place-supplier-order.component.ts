import { QuantityModalComponent } from './quantity-modal/quantity-modal.component';
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
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

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

  //form: FormGroup;
  loading = false;
  submitted = false;
  collection = [];
  supplier = [];
  selected: string;
  productitems: Productitem[] = [];
  dataSource = new MatTableDataSource<Productitem>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  placeSupplierOrders: PlaceSupplierOrder[] = [];
  placeSupplierOrder: Observable<PlaceSupplierOrder[]>;
  //dataSource = new MatTableDataSource<PlaceSupplierOrder>();
  displayedColumns: string[] = ['checkbox', 'productItemName', 'quantityOnHand'];
  @ViewChild(MatSort) sort: MatSort;
  selectedItemsList = [];
  checkedIDs = [];

  highlight(element: PlaceSupplierOrder) {
    element.highlighted = !element.highlighted;
  }

  form = this.FB.group({
    supplierID: ['', Validators.required]
  })

  constructor(
    private productitemService: ProductitemService,
    private placeSupplierOrderService: PlaceSupplierOrderService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
    private FormGroup: FormBuilder,
    private FB: FormBuilder,

    // public dialogRef: MatDialogRef<PlaceSupplierOrder>
  ) { }

  ngOnInit(): void {

    const formOptions: AbstractControlOptions = {};
    this.form = this.FormGroup.group({
      supplierID: ['', [Validators.required, Validators.maxLength(50)]],
    }
      , formOptions)

    this.getSupplier();

    setTimeout(() => this.dataSource.paginator = this.paginator);
    // this.dataSource.paginator = this.paginator;

    this.readProductitems();

    this.productitemService.GetProductItem().subscribe((result: Productitem[]) => {
      this.productitems = result;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    });

  }

  filter() {

    const filter = (e) => {

      return e.productItemName && e.productItemName.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.productitems.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data);

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  readProductitems(): void {
    this.productitemService.GetProductItem().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
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


  PlaceOrder() {
    const confirm = this.dialog.open(QuantityModalComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      this.router.navigateByUrl('placeSupplierOrder');
    })
  }

  finalOrder() {
    const placeOrder: PlaceSupplierOrder = this.form.value;
    this.placeSupplierOrderService.CreateSupplierOrder(placeOrder).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('placeSupplierOrder');
    })

  }
}

