import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Productcategory } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { ProductcategoryService } from 'src/app/services/productcategory/productcategory.service';
import {  HttpClient, HttpErrorResponse  } from '@angular/common/http';

@Component({
  selector: 'app-productcategorys',
  templateUrl: './productcategorys.component.html',
  styleUrls: ['./productcategorys.component.scss']
})
export class ProductcategorysComponent implements OnInit {

//search code
Productcategorys:Productcategory[];
searchValue: string;
dataNotFound: boolean;

  productcategorys: Productcategory[] = [];
  productcategory: Observable<Productcategory[]>;
  dataSource = new MatTableDataSource<Productcategory>();
  displayedColumns: string[] = ['productCategoryName', 'actions'];

  constructor(private productcategoryService: ProductcategoryService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private httpClient: HttpClient
              ) {}

  ngOnInit(): void {
    this.readProductcategorys();

    this.productcategoryService.GetProductCategory().subscribe((result:Productcategory[]) => {
      this.Productcategorys = result;
    });

  }

   readProductcategorys(): void {
     this.productcategoryService.GetProductCategory().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
  }

  filter(){

    const filter = (e) => {

      return e.productCategoryDescription && e.productCategoryDescription.toLowerCase().includes(this.searchValue.toLowerCase()) 
    }
    const data = (this.Productcategorys.filter(filter))
    this.dataNotFound = data.length===0
    this.dataSource = new MatTableDataSource(data)
 }

  deleteProductcategory(Productcategory: Productcategory) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.productcategoryService.DeleteProductCategory(Productcategory).subscribe(res => {
          this.readProductcategorys();
        },(error: HttpErrorResponse) =>
        {
          console.log(error.error,"test")
         if (error.status === 400)
        {
          this.snack.open(error.error, 'OK', 
          {
            verticalPosition: 'bottom',
            horizontalPosition: 'center',
            duration: 3000
          });   
          return;
        }
      });
      this.snack.open('Product Category Successfully Deleted! ', 'OK', 
      {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 1000
      });
      }
    });
  }

}