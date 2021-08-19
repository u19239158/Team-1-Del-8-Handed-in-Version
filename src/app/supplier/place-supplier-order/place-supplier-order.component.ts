import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog}from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import { PlaceSupplierOrderService } from 'src/app/services/place-supplier-order/place-supplier-order.service';
import { PlaceSupplierOrder, Productitem } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-place-supplier-order',
  templateUrl: './place-supplier-order.component.html',
  styleUrls: ['./place-supplier-order.component.scss']
})
export class PlaceSupplierOrderComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  isHidden: boolean = true;
  collection = [];
  supplier = [];
  selected: string;
  productitems: Productitem[] = [];
  dataSource = new MatTableDataSource<Productitem>();

  placeSupplierOrders: PlaceSupplierOrder[] = [];
  placeSupplierOrder: Observable<PlaceSupplierOrder[]>;
  dataSource = new MatTableDataSource<PlaceSupplierOrder>();
  displayedColumns: string[] = ['productItem', 'quantity'];
  form: any;

  constructor(
    private productitemService: ProductitemService,
    private placeSupplierOrderService: PlaceSupplierOrderService,
    private http: HttpClient,
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCollection();
    this.getSupplier();
    this.readProductitems();

    this.productitemService.GetProductItem().subscribe((result:Productitem[]) => {
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

  onSubmit() {

    if (this.form.invalid) {
      return;
    }
  }

  showProducts(){
    this.isHidden = false;
  }

  placeOrder(){
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
     });

     confirm.afterClosed().subscribe(res => {
      if (res){

      const placeSupplierOrder: PlaceSupplierOrder = this.form.value;
      this.placeSupplierOrderService.CreateSupplierOrder(placeSupplierOrder).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('supplier');
      })
    }
  });
  }
}
