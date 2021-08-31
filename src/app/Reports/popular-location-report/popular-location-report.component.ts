import { Component, OnInit } from '@angular/core';
//import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-popular-location-report',
  templateUrl: './popular-location-report.component.html',
  styleUrls: ['./popular-location-report.component.scss']
})
export class PopularLocationReportComponent implements OnInit {
  // public barChartOptions: ChartOptions
  //  = {
  //   responsive: true,
  //   // We use these empty structures as placeholders for dynamic theming.
  //   //scales: { xAxes: [{}], yAxes: [{}] },
  //   plugins: {
  //     // datalabels: {
  //     //   anchor: 'end',
  //     //   align: 'end',
  //     // }
  //   }
  // };
  public barChartLabels: Label[] = ['Gauteng', 'Eastern Cape', 'Western Cape', 'KZN', 'Northern Cape', 'Mpumalanga', 'North West', 'Limpopo'];
  //public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  //Where our data comes from
 // public barChartData: ChartDataset[] = [
  //   { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //   { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  // ];



  constructor() { }

  ngOnInit(): void {
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  // public randomize(): void {
    // Only Change 3 values
  //   this.barChartData[0].data = [
  //     Math.round(Math.random() * 100),
  //     59,
  //     80,
  //     (Math.random() * 100),
  //     56,
  //     (Math.random() * 100),
  //     40 ];
  // }
}
