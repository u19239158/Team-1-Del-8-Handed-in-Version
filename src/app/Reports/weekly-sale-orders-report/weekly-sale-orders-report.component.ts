import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import jsPDF from 'jspdf';
import { ReportParameters, Reports } from 'src/app/interfaces';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import html2canvas from 'html2canvas';
import { MatTableDataSource } from '@angular/material/table';

// Start Date Range Code
import { DateAdapter } from '@angular/material/core';
import {
  MatDateRangeSelectionStrategy,
  DateRange,
  MAT_DATE_RANGE_SELECTION_STRATEGY,
} from '@angular/material/datepicker';

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
      const endDate = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(startDate, endDate);
    }

    return new DateRange<D>(null, null);
  }
}
// End Date Range Code

@Component({
  selector: 'app-weekly-sale-orders-report',
  templateUrl: './weekly-sale-orders-report.component.html',
  styleUrls: ['./weekly-sale-orders-report.component.scss'],

  // Start Date Range Code
  providers: [{
    provide: MAT_DATE_RANGE_SELECTION_STRATEGY,
    useClass: WeekSelectionStrategy
  }]
  // End Date Range Code
})

export class WeeklySaleOrdersReportComponent implements OnInit {
  dataSource = new MatTableDataSource<Reports>();
  displayedColumns: string[] = ['saleId', 'saleOrderDate', 'customerId','customerName', 'customerCellphoneNumber', 'customerBusinessName','salePaymentAmount'];
  tableData: any;
  aveg: any;
  total : any;
  ReportParams: ReportParameters = {
    startDate: null,
    endDate: null
  };
  form: FormGroup
  created = false;

  // ReportParameters: ReportParameters[];

  // public barChartOptions: ChartOptions = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     datalabels: {
  //       anchor: 'end',
  //       align: 'end',
  //     }
  //   }
  // };
  // public barChartLabels: Label[] = ['Gauteng',
  //   'Eastern Cape',
  //   'Western Cape',
  //   'KZN',
  //   'Northern Cape',
  //   'Mpumalanga',
  //   'North West',
  //   'Limpopo'];
  // public barChartType: ChartType = 'bar';
  // public barChartLegend = true;
  // //public barChartPlugins = [pluginDataLabels];

  // public barChartData: ChartDataSets[] = [
  //   // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },

  // ];

  constructor(
    private serv: ReportServiceService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      startDate: ['' , Validators.required],
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
      this.created = false;
      this.serv.SalesReportSum(this.form.value).subscribe(res =>{
        console.log(res)
          this.total = res
          })
        
      console.log(data);
      this.dataSource = new MatTableDataSource(data)
      this.generateTables(data);
    });

    this.serv.SalesReportAvg(this.form.value).subscribe(res =>{
      console.log(res)
      this.aveg = res;
    })
  }

  // generateChart(data) {
  //   this.barChartData = [];
  //   this.barChartData.push({
  //     data: data,
  //     label: 'Sales'
  //   });
  //   this.created = true;
  // }

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
      PDF.save('Weekly Sales Report.pdf');
    });
  }

  //getGrandAverage() {
  //const len = this.averages.length;
  //  let sum = 0;

  //  sum = this.averages.reduce((acc, current) => acc + current);
  //  this.grandAverage = Math.round(sum / len)  ;
  //}

  generateTables(data) {
    this.tableData = data;
    this.created = true;
    // this.averages = data.map(avg => avg.AverageQuantityOrdered);
    // this.getGrandAverage();
  }

  // public randomize(): void {
  //   // Only Change 3 values
  //   this.barChartData[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40];
  // }
}
