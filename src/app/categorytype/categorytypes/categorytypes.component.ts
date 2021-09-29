import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Categorytype } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { CategorytypeService } from 'src/app/services/categorytype/categorytype.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-categorytypes',
  templateUrl: './categorytypes.component.html',
  styleUrls: ['./categorytypes.component.scss']
})
export class CategorytypesComponent implements OnInit {

  //search code
  CategoryTypes: Categorytype[];
  searchValue: string;
  dataNotFound: boolean;

  categorytypes: Categorytype[] = [];
  categorytype: Observable<Categorytype[]>;
  userid : number;
  dataSource = new MatTableDataSource<Categorytype>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['productCategoryDesc', 'categoryTypeImage', 'categoryTypeDescription', 'actions'];
  @ViewChild(MatSort) sort: MatSort;

  constructor(private categorytypeService: CategorytypeService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient) { }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.readCategorytypes();

    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   this.userid = obj.userId
    

    this.categorytypeService.GetCategoryType().subscribe((result: Categorytype[]) => {
      this.CategoryTypes = result;
    });

  }

  filter() {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    const filter = (e) => {
      return e.productCategoryDesc && e.productCategoryDesc.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.categoryTypeDescription && e.categoryTypeDescription.toLowerCase().includes(this.searchValue.toLowerCase())
    }

    const data = (this.CategoryTypes.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)

  }

  readCategorytypes(): void {

    this.categorytypeService.GetCategoryType().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
    //this.dataSource = new MatTableDataSource<Categorytype>(this.categorytypeService.getAll());
  }

  deleteCategorytype(Categorytype: Categorytype) {
    Categorytype.usersId =this.userid
    const confirm = this.dialog.open(GlobalConfirmComponent, {
      disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      setTimeout(() => this.dataSource.paginator = this.paginator);
      if (res) {
        
        this.categorytypeService.DeleteCategoryType(Categorytype).subscribe(res => {
          this.readCategorytypes();
          this.snack.open('Category Type Successfully Deleted! ', 'OK',
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
