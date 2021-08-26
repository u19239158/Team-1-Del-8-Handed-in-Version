import { AbstractControlOptions, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { Reports, ReportParameters } from 'src/app/interfaces';

@Component({
  selector: 'app-monthly-sales-order-report',
  templateUrl: './monthly-sales-order-report.component.html',
  styleUrls: ['./monthly-sales-order-report.component.scss']
})
export class MonthlySalesOrderReportComponent implements OnInit {
form:FormGroup
ReportParams : ReportParameters = {
  startDate: null,
  endDate: null};
created = true;
tableData: any;
  ReportParameters: ReportParameters[];
  // formBuilder: any;


  constructor(
    private serv : ReportServiceService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    const formOptions: AbstractControlOptions = { };
    this.form = this.formBuilder.group({
      startDate : [''],
      endDate : [''],
    }, formOptions)
  }

  generateReport(){
    this.serv.SalesReport(this.ReportParams).subscribe((result:ReportParameters[]) => {
      this.ReportParameters = result;
    
      this.created = false;
      // Restructure data for chart
      // products = data.map(x => x.ProductName);
      // averages = data.map(x => x.AverageQuantityOrdered)

      
      // Generate Chart
      // this.generateChart(products, averages)

      // Call table data method
      //this.generateTables(data);
    });
  }
onSubmit(){

}
  generatePdf(){

  }

  generateTables(data) {
    this.tableData = data;
    // this.averages = data.map(avg => avg.AverageQuantityOrdered);
    // this.getGrandAverage();
  }

}
