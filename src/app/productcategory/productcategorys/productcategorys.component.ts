import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Productcategory } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { ProductcategoryService } from 'src/app/services/productcategory/productcategory.service';

@Component({
  selector: 'app-productcategorys',
  templateUrl: './productcategorys.component.html',
  styleUrls: ['./productcategorys.component.scss']
})
export class ProductcategorysComponent implements OnInit {

  productcategorys: Productcategory[] = [];
  productcategory: Observable<Productcategory[]>;
  dataSource = new MatTableDataSource<Productcategory>();
  displayedColumns: string[] = ['id', 'productCategoryName', 'actions'];

  constructor(private productcategoryService: ProductcategoryService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog) {}

  ngOnInit(): void {
    this.readProductcategorys();
  }

   readProductcategorys(): void {
     this.productcategoryService.GetProductCategory().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
  }

  deleteProductcategory(Productcategory: Productcategory) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.productcategoryService.DeleteProductCategory(Productcategory).subscribe(res => {
          this.readProductcategorys();
        });
        
      }
    });
  }

}
