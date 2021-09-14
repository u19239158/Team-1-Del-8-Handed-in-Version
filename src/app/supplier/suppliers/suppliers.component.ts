//import { Supplier } from './../../interfaces/index';
import {Supplier} from 'src/app/interfaces';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { SupplierService } from 'src/app/services/supplier/supplier.service.component';
import {  HttpClient, HttpErrorResponse  } from '@angular/common/http';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
//search code
Suppliers: Supplier[];
searchValue: string;
dataNotFound: boolean;

  Supplier: Supplier;
  supplier: Observable<Supplier[]>;
  dataSource = new MatTableDataSource<Supplier>();
  displayedColumns: string[] = ['name', 'contactNumber', 'email','supplierBalance', 'actions'];

  constructor(private supplierService: SupplierService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.readSuppliers();

    this.supplierService.GetSupplier().subscribe((result:Supplier[]) => {
      this.Suppliers = result;
    });
  }

  filter(){

    const filter = (e) => {

      return e.supplierName && e.supplierName.toLowerCase().includes(this.searchValue.toLowerCase()) 
    }
    const data = (this.Suppliers.filter(filter))
    this.dataNotFound = data.length===0
    this.dataSource = new MatTableDataSource(data)

 }

  readSuppliers(): void {
    this.supplierService.GetSupplier().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
    //this.dataSource = new MatTableDataSource<Supplier>(this.supplierService.getAll());
  }

  deleteSupplier(Supplier: Supplier) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.supplierService.DeleteSupplier(Supplier).subscribe(res => {
          this.readSuppliers();
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
      this.snack.open('Successfully Deleted Supplier! ', 'OK', 
      {
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        duration: 2000
      });
      }
     
    });
  }

}
