import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ReportParameters } from 'src/app/interfaces';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';

@Component({
  selector: 'app-weekly-sale-orders-report',
  templateUrl: './weekly-sale-orders-report.component.html',
  styleUrls: ['./weekly-sale-orders-report.component.scss']
})

export class WeeklySaleOrdersReportComponent implements OnInit {

  tableData: any;
  ReportParams: ReportParameters = {
    startDate: null,
    endDate: null
  };
  form: FormGroup
  created = false;

  // ReportParameters: ReportParameters[];

  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Gauteng',
    'Eastern Cape',
    'Western Cape',
    'KZN',
    'Northern Cape',
    'Mpumalanga',
    'North West',
    'Limpopo'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  //public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },

  ];

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
      this.created = false;
      console.log(data);

      this.generateChart(data);
    });
  }

  generateChart(data) {
    this.barChartData = [];
    this.barChartData.push({
      data: data,
      label: 'Sales'
    });
    this.created = true;
  }

  generatePdf() {

  }

  // generateTables(data) {
  //   this.tableData = data;
  //   // this.averages = data.map(avg => avg.AverageQuantityOrdered);
  //   // this.getGrandAverage();
  // }

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];
  }
}
