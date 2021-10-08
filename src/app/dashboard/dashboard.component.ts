import { Productcategory, Categorytype } from 'src/app/interfaces';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

//import ChartDataLabels from 'chartjs-plugin-datalabels';
//import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { Label } from 'ng2-charts';
import { ReportServiceService } from '../services/Reports/report-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  //Barchart
  created = false;
  Productcategory: Productcategory = {} as Productcategory;
  salegraph : Chart;
  salgraph : Chart;
  pie : Chart;
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
  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
 
  ];

  public barChartOpt: ChartOptions = {
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
  public barChartLabe: Label[] = [];
  public barChartTy: ChartType = 'bar';
  public barChartLeg = true;
  
  //public barChartPlugins = [pluginDataLabels];

  public barChartDat: ChartDataSets[] = [

  ];

  //Piechart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [['Download', 'Sales'], ['In', 'Store', 'Sales'], 'Mail Sales'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  //public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];


  constructor(private serv: ReportServiceService,
    private snack : MatSnackBar,
    ) { }

  ngOnInit(): void {
    this.generateReport();
    //this.readDeliveryReport()
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
    this.barChartDat[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40 ];
  }

  // readDeliveryReport(): void {
  //   this.serv.DashboardSales().subscribe(res => {
  //     console.log(res)
  //     //this.dataSource = new MatTableDataSource(res)
  //   })
  // }


  generateReport() {

    let ProductCategory: any[] =  [];
    let CategoryType: any[] =  [];
    let NumberOfSales: number[] =  [];
    let NumbOfSales: number[] =  [];
    let pieSales: number[] =  [];
    const counts: any[] =  [];

  this.serv.DashboardSales().subscribe(data => {
    console.log(data)
    this.created = false;
    // Restructure data for chart
    ProductCategory = data.map(x => x.ProductCategory);
     NumberOfSales = data.map(x => x.NumberOfSales)
    // Generate Chart
    this.generateChart(ProductCategory, NumberOfSales)
    // Call table data method
   // this.generateTables(data);
  }, (error: HttpErrorResponse) => {
    console.log(error.error, "test")
    if (error.status === 400) {
      this.snack.open(error.error, 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
        });
      return;
    }

  })

  this.serv.DashboardPieSales().subscribe(data => {
    console.log(data)
    this.created = false;
    // Restructure data for chart
    CategoryType = data.map(x => x.CategoryType);
    NumbOfSales = data.map(x => x.NumberOfSales)
    // Generate Chart
    this.generatePChart(CategoryType, NumbOfSales)
    // Call table data method
   // this.generateTables(data);
  })

;
}

generateChart(ProductCategory, NumberOfSales) {
  console.log(ProductCategory, NumberOfSales);
  if (this.salegraph) {this.salegraph.destroy(); }
  this.barChartData = [];
  this.barChartData.push({
    data: NumberOfSales,
    label: 'Sales Per Product Category'
  });

  this.barChartLabels = ProductCategory;
  this.created = true;
}

generatePChart(CategoryType,NumbOfSales) {
  console.log(CategoryType, NumbOfSales);
  if (this.salgraph) {this.salgraph.destroy(); }
  this.barChartDat = [];
  this.barChartDat.push({
    data: NumbOfSales,
    label: 'Sales Per Category Type'
  });

  this.barChartLabe = CategoryType;
  this.created = true;
}

generatePie(CategoryType, pieSales) {
  console.log(CategoryType, pieSales);
  if (this.pie) {this.pie.destroy(); }
  this.pieChartData = [];
  this.pieChartData.push(
     pieSales
 
  );

  this.pieChartLabels = CategoryType;
  this.created = true;
}
}
