import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Productcategory } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { ProductcategoryService } from 'src/app/services/productcategory/productcategory.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-productcategorys',
  templateUrl: './productcategorys.component.html',
  styleUrls: ['./productcategorys.component.scss']
})
export class ProductcategorysComponent implements OnInit {

  //search code
  Productcategorys: Productcategory[];
  searchValue: string;
  dataNotFound: boolean;
  userid : number;
  productcategorys: Productcategory[] = [];
  productcategory: Observable<Productcategory[]>;
  dataSource = new MatTableDataSource<Productcategory>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = ['productCategoryImage', 'productCategoryDescription', 'actions'];

  constructor(private productcategoryService: ProductcategoryService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.readProductcategorys();
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   this.userid = obj.userId
    this.productcategoryService.GetProductCategory().subscribe((result: Productcategory[]) => {
      this.Productcategorys = result;
    });

  }

  readProductcategorys(): void {
    this.productcategoryService.GetProductCategory().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  filter() {

    const filter = (e) => {

      return e.productCategoryDescription && e.productCategoryDescription.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.Productcategorys.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)
  }

  deleteProductcategory(Productcategory: Productcategory) {
    Productcategory.usersId = this.userid
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if (res) {
        this.productcategoryService.DeleteProductCategory(Productcategory).subscribe(res => {
          this.readProductcategorys();
          this.snack.open('Product Category Successfully Deleted! ', 'OK',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 4000
            });
        }, (error: HttpErrorResponse) => {
          console.log(error.error, "test")
          if (error.status === 400) {
            this.snack.open(error.error, 'OK',
              {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 4000
              });
            return;
          }
        });

      }
    });
  }

}