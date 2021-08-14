import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Productitem } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';

@Component({
  selector: 'app-productitems',
  templateUrl: './productitems.component.html',
  styleUrls: ['./productitems.component.scss']
})
export class ProductitemsComponent implements OnInit {

  productitems: Productitem[] = [];
  productitem: Observable<Productitem[]>;
  dataSource = new MatTableDataSource<Productitem>();
  displayedColumns: string[] = ['id','categorytype','name', 'description', 'cost','quantity', 'actions'];

  constructor(private productitemService: ProductitemService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.readProductitems();
  }

   readProductitems(): void {
    this.productitemService.GetProductItem().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
    //this.dataSource = new MatTableDataSource<Productitem>(this.productitemService.getAll());
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
