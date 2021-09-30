import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Special } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { SpecialService } from 'src/app/services/special/special.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';


@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {
  //search code
  Specials: Special[];
  searchValue: string;
  dataNotFound: boolean;
  public specspeiial: any = [];
  specials: Special[] = [];
  userid : number;
  special: Observable<Special[]>;
  dataSource = new MatTableDataSource<Special>();
  displayedColumns: string[] = ['productItemName', 'specialDescription', 'specialPrice', 'specialStartDate', 'specialEndDate', 'actions'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private specialService: SpecialService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    setTimeout(() => this.dataSource.paginator = this.paginator);
    this.readSpecials();
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   this.userid = obj.userId
    this.specialService.GetSpecial().subscribe((result: Special[]) => {
      this.Specials = result;
    });

  }

  readSpecials(): void {
    //this.dataSource = new MatTableDataSource<Special>(this.specialService.getAll());
    this.specialService.GetSpecial().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
      setTimeout(() => this.dataSource.paginator = this.paginator);
    })
  }

  filter() {

    const filter = (e) => {

      return e.specialDescription && e.specialDescription.toLowerCase().includes(this.searchValue.toLowerCase()) ||
        e.productItemName && e.productItemName.toLowerCase().includes(this.searchValue.toLowerCase())
    }
    const data = (this.Specials.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)
  }

  deleteSpecial(special: Special) {
    special.usersId = this.userid
    // this.specialService.getSpecialByID(special.specialID).subscribe(res => {
    //   this.specspeiial = res;
    //   console.log(this.specspeiial)
      const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
      });

      confirm.afterClosed().subscribe(res => {
        if (res) {
          this.specialService.DeleteSpecial(special).subscribe(res => {
            this.readSpecials();
          });

          this.snack.open('Special Successfully Deleted! ', 'OK',
            {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 4000
            });

        }
      });
   // })
  }


}