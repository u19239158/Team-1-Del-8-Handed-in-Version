import { Component, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import jsPDF from 'jspdf';
import { ReportParameters, Reports } from 'src/app/interfaces';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';
import { HttpErrorResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatSort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DateRange, MatDatepicker, MatDateRangeSelectionStrategy, MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
import * as _moment from 'moment';
import * as moment from 'moment';
import * as XLSX from 'xlsx';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Injectable()
export class WeekSelectionStrategy<D>
  implements MatDateRangeSelectionStrategy<D>
{
  constructor(private _dateAdapter: DateAdapter<D>) { }

  selectionFinished(date: D | null): DateRange<D> {
    return this._createSevenDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createSevenDayRange(activeDate);
  }

  private _createSevenDayRange(date: D | null): DateRange<D> {
    if (date) {
      const startDate = this._dateAdapter.addCalendarDays(date, 0);
      const endDate = this._dateAdapter.addCalendarDays(date, 30);
      return new DateRange<D>(startDate, endDate);
    }

    return new DateRange<D>(null, null);
  }
}

@Component({
  selector: 'app-monthly-sales-order-report',
  templateUrl: './monthly-sales-order-report.component.html',
  styleUrls: ['./monthly-sales-order-report.component.scss'],
  // providers: [
  //   // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
  //   // application's root module. We provide it at the component level here, due to limitations of
  //   // our example generation script.
  //   {
  //     provide: DateAdapter,
  //     useClass: MomentDateAdapter,
  //     deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
  //   },

  //   { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  // ],
  // Start Date Range Code
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: WeekSelectionStrategy
  }]
  // End Date Range Code
})
export class MonthlySalesOrderReportComponent implements OnInit {
  dataSource = new MatTableDataSource<Reports>();
  dataSauce = new MatTableDataSource<Reports>();
  displayedColumns: string[] = ['saleId', 'saleOrderDate', 'customerName', 'customerCellphoneNumber', 'customerBusinessName', 'salePaymentAmount'];
  displayed: string[] = ['ProductCategory', 'NumberOfSales'];
  tableData: any;
  Sales: any;
  aveg: any;
  total: any;
  yeartot: any;
  fileName = 'MonthlySales.xlsx';
  ReportParams: ReportParameters = {
    startDate: null,
    endDate: null
  };
  form: FormGroup
  created = false;

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: _moment.Moment) {
    const ctrlValue = this.date.value;
    ctrlValue.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: _moment.Moment, datepicker: MatDatepicker<_moment.Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private serv: ReportServiceService,
    private formBuilder: FormBuilder,
    private snack: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    })
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  generateReport() {
    this.serv.SalesReport(this.form.value).subscribe(data => {
      this.serv.YearSales().subscribe( menace => {
        this.yeartot = menace
      })
      this.created = true;
      //this.Sales = true;
      console.log(data);
      this.serv.SalesReportSum(this.form.value).subscribe(res => {
        console.log(res)
        this.total = res
        this.dataSource = new MatTableDataSource(data)
        this.dataSource.sort = this.sort;
        // this.generateTables(data);
        this.serv.SalesReportAvg(this.form.value).subscribe(res => {
          console.log(res)
          this.aveg = res;
          this.serv.SalesControl(this.form.value).subscribe(res => {
            this.dataSauce = new MatTableDataSource(res)
            this.dataSauce.sort = this.sort;
            console.log(res);
          })
        }, (error: HttpErrorResponse) => {
          console.log(error.error, "test")
          if (error.status === 400) {
            this.snack.open(error.error, 'OK',
              {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 3000
              });
            return;
          }
        })

      });

    }
    )



  }
  // Restructure data for chart
  // products = data.map(x => x.ProductName);
  // averages = data.map(x => x.AverageQuantityOrdered)


  // Generate Chart
  // this.generateChart(products, averages)

  // Call table data method
  //this.generateTables(data);


  generatePdf(): void {
    let Data = document.getElementById('htmlData')!;

    // Canvas Options
    html2canvas(Data).then(canvas => {
      let fileWidth = 210;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const contentDataURL = canvas.toDataURL('image/png')


      let PDF = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', });
      let topPosition = 10;
      let leftPosition = 0;
      PDF.addImage(contentDataURL, 'PNG', leftPosition, topPosition, fileWidth, fileHeight)
      PDF.save('Monthly Sales Report.pdf');
    });
  }

  exportexcel(): void {
    /* table id is passed over here */
    let element = document.getElementById('saleTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, this.fileName);

  }
}

  // generateTables(data) {
  //   this.tableData = data;
  //   this.created = true;
  //   // this.averages = data.map(avg => avg.AverageQuantityOrdered);
  //   // this.getGrandAverage();
  // }


