import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Special } from 'src/app/interfaces';
import { GlobalConfirmComponent } from 'src/app/modals/globals/global-confirm/global-confirm.component';
import { SpecialService } from 'src/app/services/special/special.service';

@Component({
  selector: 'app-specials',
  templateUrl: './specials.component.html',
  styleUrls: ['./specials.component.scss']
})
export class SpecialsComponent implements OnInit {
  specials: Special[] = [];
  special: Observable<Special[]>;
  dataSource = new MatTableDataSource<Special>();
  displayedColumns: string[] = ['image', 'description',  'startDate','endDate', 'actions'];

  constructor(
    private specialService: SpecialService,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.readSpecials();
  }

  readSpecials(): void {
    //this.dataSource = new MatTableDataSource<Special>(this.specialService.getAll());
    this.specialService.GetSpecial().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
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
