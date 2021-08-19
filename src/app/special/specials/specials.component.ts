import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { Special } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { SpecialService } from 'src/app/services/special/special.service';
import {  HttpClient  } from '@angular/common/http';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {
//search code
Specials: Special[];
searchValue: string;

  specials: Special[] = [];
  special: Observable<Special[]>;
  dataSource = new MatTableDataSource<Special>();
  displayedColumns: string[] = ['description',  'startDate','endDate', 'actions'];

  constructor(
    private specialService: SpecialService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
    this.readSpecials();

    this.specialService.GetSpecial().subscribe((result:Special[]) => {
      this.Specials = result;
    });

  }

  readSpecials(): void {
    //this.dataSource = new MatTableDataSource<Special>(this.specialService.getAll());
    this.specialService.GetSpecial().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  filter(){
    this.dataSource = new MatTableDataSource (this.Specials.filter(e=>e.specialDescription.toLowerCase().includes(this.searchValue.toLowerCase())))
  }

  deleteSpecial(Special: Special) {
    const confirm = this.dialog.open(GlobalConfirmComponent, {
        disableClose: true,
    });

    confirm.afterClosed().subscribe(res => {
      if(res) {
        this.specialService.DeleteSpecial(Special).subscribe (res => {
          this.readSpecials();
        }) ;
        
      }
    });
  }


}
