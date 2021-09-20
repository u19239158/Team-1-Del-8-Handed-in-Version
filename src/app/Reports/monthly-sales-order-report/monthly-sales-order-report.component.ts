import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import jsPDF from 'jspdf';
import { ReportParameters, Reports } from 'src/app/interfaces';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import * as moment from 'moment';

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

@Component({
  selector: 'app-monthly-sales-order-report',
  templateUrl: './monthly-sales-order-report.component.html',
  styleUrls: ['./monthly-sales-order-report.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthlySalesOrderReportComponent implements OnInit {
  dataSource = new MatTableDataSource<Reports>();
  displayedColumns: string[] = ['saleId', 'saleOrderDate', 'customerName', 'customerCellphoneNumber', 'customerEmailAddress', 'customerBusinessName', 'salePaymentAmount'];
  tableData: any;
  Sales: any;
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

  constructor(
    private serv: ReportServiceService,
    private formBuilder: FormBuilder,
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
      this.created = true;
      //this.Sales = true;
      console.log(data);

      this.serv.SalesReportSum(this.form.value).subscribe(res => {
        console.log(res)

        this.dataSource = new MatTableDataSource(data)
        // this.generateTables(data);


      })
    });
    this.serv.SalesReportAvg(this.form.value).subscribe(res => {
      console.log(res)
    })

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

  // generateTables(data) {
  //   this.tableData = data;
  //   this.created = true;
  //   // this.averages = data.map(avg => avg.AverageQuantityOrdered);
  //   // this.getGrandAverage();
  // }

}
