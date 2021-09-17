import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute  } from '@angular/router';
import { Productitem, Categorytype } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { ProductitemService } from 'src/app/services/productitem/productitem.service';
import {  HttpClient, HttpErrorResponse  } from '@angular/common/http';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-productitems',
  templateUrl: './productitems.component.html',
  styleUrls: ['./productitems.component.scss']
})
export class ProductitemsComponent implements OnInit {
 
//search code
Productitems: Productitem[];
searchValue: string;
dataNotFound: boolean;

  productitems: Productitem[] = [];
  public pItem : any =[];
  productitem: Observable<Productitem[]>;
  dataSource = new MatTableDataSource<Productitem>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['categorytype','name', 'description','priceDescription', 'cost','quantity', 'actions'];

 
  
  constructor(private productitemService: ProductitemService,
              private snack: MatSnackBar,
              private router: Router,
              private dialog: MatDialog,
              private httpClient: HttpClient
              ) {}

              
              
  // ngAfterViewInit() {
  //   this.dataSource.paginator = this.paginator;
  // }

  
  
  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    //this.dataSource.paginator = this.paginator;
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

  SendID(productItemId: any) {
    //CODE USED TO GET ID THROUGH BUTTON 64-67 & 30
  this.productitemService.getProductItemByID(productItemId).subscribe(res=>{
    this.pItem =res;
    console.log(this.pItem)
   
  });
  }

  filter(){

    const filter = (e) => {

      return e.categoryTypeName && e.categoryTypeName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.productItemName && e.productItemName.toLowerCase().includes(this.searchValue.toLowerCase()) 
    }
    const data = (this.Productitems.filter(filter))
    this.dataNotFound = data.length===0
    this.dataSource = new MatTableDataSource(data)
  }

  deleteProductitem(Productitem: Productitem) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.productitemService.DeleteProductitem(Productitem).subscribe( res =>{
          this.readProductitems();
        },(error: HttpErrorResponse) =>
        {
          console.log(error.error,"test")
         if (error.status === 400)
        {
          this.snack.open(error.error, 'OK', 
          {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000
          });
         
          
          return;
        }
      });
        this.snack.open('Product Item Successfully Deleted! ', 'OK', 
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
      }
    });

   
  }

}
