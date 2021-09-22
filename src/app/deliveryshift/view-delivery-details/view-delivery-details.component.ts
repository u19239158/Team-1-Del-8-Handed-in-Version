import { OnlineSales, Deliveryshift } from 'src/app/interfaces';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnlineSalesService } from 'src/app/services/online-sales/online-sales.service';
import { DeliveryshiftService } from 'src/app/services/deliveryshift/deliveryshift.service';
import { MatSort } from '@angular/material/sort';
import { direction } from 'html2canvas/dist/types/css/property-descriptors/direction';

@Component({
  selector: 'app-view-delivery-details',
  templateUrl: './view-delivery-details.component.html',
  styleUrls: ['./view-delivery-details.component.scss']
})
export class ViewDeliveryDetailsComponent implements OnInit {

  id: number;
  collection = [];
  selected: string;
  public sales: any = [];
  dshift: Deliveryshift = {} as Deliveryshift;
  // id: number;
  loading = false;
  matVersion: string = '5.1.0';
  breakpoint: number;
  //search code
  DeliveryShifts: Deliveryshift[];
  searchValue: number;
  searchWord: string;
  dataNotFound: boolean;
  deliveryshift: Deliveryshift[] = [];
  // DeliveryShift: Deliveryshift;
  deliveryShift: Observable<Deliveryshift[]>;
  dataSource = new MatTableDataSource<Deliveryshift>();
  displayedColumns: string[] = ['saleID', 'customerName', 'customerBusinessName', 'customerCellphoneNumber', 'addressPostalCode'];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private OnlineSalesService: OnlineSalesService,
    private deliveryshiftService: DeliveryshiftService,
    private route: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private http: HttpClient,) { }

  ngOnInit(): void {

    this.readDeliveryshifts();

    this.deliveryshiftService.GetDeliveryShiftWSale().subscribe((result: Deliveryshift[]) => {
      this.DeliveryShifts = result;
    });

    this.breakpoint = (window.innerWidth <= 600) ? 1 : 2;

    this.id = this.route.snapshot.params['id'];
    //this.getCollection();

    this.deliveryshiftService.GetAssigned(this.id).subscribe(res => {
      if (res) {
        this.dshift = res
        console.log(res),
          (error: HttpErrorResponse) => {
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
          }
      }
    });
  }

  readDeliveryshifts(): void {
    this.deliveryshiftService.GetDeliveryShiftWSale().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.sort = this.sort;
    })
  }

  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 600) ? 1 : 2;
  }

  Close() {
    this.router.navigateByUrl('viewDeliveryShiftSchedule');
  }

  filter() {
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.startTime.includes(this.searchValue)))
    // // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.endTime.includes(this.searchValue)))
    // this.dataSource = new MatTableDataSource (this.DeliveryShifts.filter(e=>e.dayOfTheWeek.includes(this.searchValue)))

    const filter = (e) => {

      return e.saleID && e.saleID.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.customerName && e.customerName.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.customerBusinessName && e.customerBusinessName.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.customerCellphoneNumber && e.customerCellphoneNumber.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.provinceDescription && e.provinceDescription.toLowerCase().includes(this.searchWord.toLowerCase()) ||
        e.addressPostalCode && e.addressPostalCode.toLowerCase().includes(this.searchWord.toLowerCase())
    }
    const data = (this.DeliveryShifts.filter(filter))
    this.dataNotFound = data.length === 0
    this.dataSource = new MatTableDataSource(data)
  }


}
