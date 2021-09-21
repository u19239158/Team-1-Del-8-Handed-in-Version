import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
// import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ReportParameters, Reports } from 'src/app/interfaces';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import html2canvas from 'html2canvas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-popular-location-report',
  templateUrl: './popular-location-report.component.html',
  styleUrls: ['./popular-location-report.component.scss']
})
export class PopularLocationReportComponent implements OnInit {
  dataSource = new MatTableDataSource<Reports>();
  tableData: any;
  ReportParams: ReportParameters = {
    startDate: null,
    endDate: null
  };
  form: FormGroup
  created = false;
  salegraph : Chart;
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{
      ticks: {
          beginAtZero: true
      }
  }]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['Gauteng', 'KZN', 'Limpopo', 'Northern Cape', 'Eastern Cape', 'Western Cape', 'Mpumalanga', 'North West'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  // public barChartPlugins = [pluginDataLabels];



  constructor(private serv: ReportServiceService,
    private formBuilder: FormBuilder,) { }

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

  public randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

  generateReport() {

      let provinceDescription: any[] =  [];
      let provincesales: number[] =  [];
      const counts: any[] =  [];
  
    this.serv.PopularLocationReport(this.form.value).subscribe(data => {
      this.created = false;
      // Restructure data for chart
       provinceDescription = data.map(x => x.provinceDescription);
       provincesales = data.map(x => x.provincesales)

      // Generate Chart
      this.generateChart(provinceDescription, provincesales)

      // Call table data method
     // this.generateTables(data);
    });
  }

  public barChartData: ChartDataSets[] = [
    //{ data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    //{ data : [this.tableData.provinceDescription]}
  ];

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
      PDF.save('Popular Location Report.pdf');
    });
  }
  // generateTables(data) {
  //   this.tableData = data;
  //   this.created = true;
    // this.averages = data.map(avg => avg.AverageQuantityOrdered);
    // this.getGrandAverage();
 // }

 generateChart(provinceDescription, provincesales) {
  console.log(provinceDescription, provincesales);
  if (this.salegraph) {this.salegraph.destroy(); }
  this.barChartData = [];
  this.barChartData.push({
    data: provincesales,
    label: 'Sales Per Province'
  });

  this.barChartLabels = provinceDescription;
  this.created = true;
}

}
