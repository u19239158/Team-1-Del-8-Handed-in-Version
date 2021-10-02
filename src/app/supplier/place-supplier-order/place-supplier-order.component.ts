import { QuantityModalComponent } from './quantity-modal/quantity-modal.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import { PlaceSupplierOrderService } from 'src/app/services/place-supplier-order/place-supplier-order.service';
import { PlaceSupplierOrder, Productitem, Data, place } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';
import { MomentDateModule } from '@angular/material-moment-adapter';

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
  // arr: Array<{id: number, text: string}>
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
  checkedIDs = [];
  public list: Data [] = [];
  name: string;
  quant: number;
  QuantityModalComponent: QuantityModalComponent;
  place : place;
  
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
      // this.name = this.productitems.productItemName;
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

  PlaceOrder(producItemName: string, productItemId: number) {
    const confirm = this.dialog.open(QuantityModalComponent, {
      disableClose: true,
    });
   
     confirm.afterClosed().subscribe(res => {

      if(res) {
      // this.QuantityModalComponent.content.event.subscribe(res => {
      
      var num = localStorage.getItem('quantity');
      const q = JSON.parse(num);
      this.quant = q;
      console.log(this.quant);
      console.log(res);
      this.list.push({name: producItemName, quantity: this.quant , id:productItemId });
      console.log(this.list);
      }
      this.router.navigateByUrl('placeSupplierOrder');
    })
  }

  finalOrder() {
    const placeOrder: PlaceSupplierOrder = this.form.value;

   
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      
      console.log(element);
      console.log(element.id)
        
      this.place.id = element.id;
       element.name = this.place.name;
       element.quantity = this.place.quantity;
      
    
    }

    this.placeSupplierOrderService.PlaceSupplierOrder(this.place).subscribe(res => {
      console.log(res)
      this.loading = false
      this.router.navigateByUrl('placeSupplierOrder');

      // this.list.forEach(order => {
      //     console.log(order);
      // }); 
    })
  }

 

  clearOrder(){

  }
}

