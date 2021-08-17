import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Categorytype } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { CategorytypeService } from 'src/app/services/categorytype/categorytype.service';
import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-categorytypes',
  templateUrl: './categorytypes.component.html',
  styleUrls: ['./categorytypes.component.scss']
})
export class CategorytypesComponent implements OnInit {

//search code
CategoryTypes: Categorytype[];
searchValue: string;

  categorytypes: Categorytype[] = [];
  categorytype: Observable<Categorytype[]>;
  dataSource = new MatTableDataSource<Categorytype>();
  displayedColumns: string[] = ['productCategoryName', 'categoryType', 'actions'];

  constructor(private categorytypeService: CategorytypeService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.readCategorytypes();

    this.categorytypeService.GetCategoryType().subscribe((result:Categorytype[]) => {
      this.CategoryTypes = result;
    });

  }

  filter(){
  
    this.dataSource = new MatTableDataSource (this.CategoryTypes.filter(e=>e.productCategoryDesc.toLowerCase().includes(this.searchValue.toLowerCase())))
    this.dataSource = new MatTableDataSource (this.CategoryTypes.filter(e=>e.categoryTypeDescription.toLowerCase().includes(this.searchValue.toLowerCase())))
  }

   readCategorytypes(): void {
     this.categorytypeService.GetCategoryType().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
    //this.dataSource = new MatTableDataSource<Categorytype>(this.categorytypeService.getAll());
  }

  deleteCategorytype(Categorytype: Categorytype) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.categorytypeService.DeleteCategoryType(Categorytype).subscribe(res => {
          this.readCategorytypes();
        });

      }
    });
  }


}
