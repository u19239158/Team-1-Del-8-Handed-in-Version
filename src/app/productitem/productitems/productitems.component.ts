import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute  } from '@angular/router';
import { Productitem, Categorytype } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-productitems',
  templateUrl: './productitems.component.html',
  styleUrls: ['./productitems.component.scss']
})
export class ProductitemsComponent implements OnInit {

//search code
Productitems: Productitem[];
searchValue: string;

  productitems: Productitem[] = [];
  productitem: Observable<Productitem[]>;
  dataSource = new MatTableDataSource<Productitem>();
  displayedColumns: string[] = ['categorytype','name', 'description', 'cost','quantity', 'actions'];

  constructor(private productitemService: ProductitemService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private httpClient: HttpClient
              ) {}

  ngOnInit(): void {
    this.readProductitems();

    this.productitemService.GetProductItem().subscribe((result:Productitem[]) => {
      this.Productitems = result;
    });

  }

   readProductitems(): void {
    this.productitemService.GetProductItem().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
    //this.dataSource = new MatTableDataSource<Productitem>(this.productitemService.getAll());
  }

  filter(){
    this.dataSource = new MatTableDataSource (this.Productitems.filter(e=>e.categoryTypeName.toLowerCase().includes(this.searchValue.toLowerCase())))
    this.dataSource = new MatTableDataSource (this.Productitems.filter(e=>e.productItemName.toLowerCase().includes(this.searchValue.toLowerCase())))
    // this.dataSource = new MatTableDataSource (this.Productitems.filter(e=>e.productItemCost.numbers().includes(this.searchValue.numbers())))

  }

  deleteProductitem(Productitem: Productitem) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.productitemService.DeleteProductitem(Productitem).subscribe( res =>{
          this.readProductitems();
        });

      }
    });
  }

}
