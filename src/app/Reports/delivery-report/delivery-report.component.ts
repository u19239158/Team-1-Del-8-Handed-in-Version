import { Component, OnInit } from '@angular/core';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { MatTableDataSource } from '@angular/material/table'
import { Customer } from './../../interfaces/index';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.scss']
})
export class DeliveryReportComponent implements OnInit {
   constructor(private service: ReportServiceService ) { }
  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['saleId', 'Date','customerId', 'customerName', 'contactNumber', 'customerEmailAddress', 'customerAddress'];


  ngOnInit(): void {
    //this.readDeliveryReport();
  }

  // readDeliveryReport(): void {
  //    this.service.DeliveryReport(Reports : Reports).subscribe(res => {
  //      console.log(res)
  //      this.dataSource = new MatTableDataSource(res)
  //    })
  // }

  header = [['Sale ID', 
              'Date', 
              'Customer ID', 
              'CustomerName',
              'Customer Email Address',
              'Customer Address'
            ]]

  generatePdf() {
    var pdf = new jsPDF();
  
          pdf.setFontSize(2);
          pdf.text('Stock Level Report', 11, 8);
          pdf.setFontSize(12);
          pdf.setTextColor(99);
  
  
          (pdf as any).autoTable({
          head: this.header,
          body: this.dataSource,
          theme: 'plain',
          didDrawCell: data => {
              console.log(data.column.index)
          }
          })
  
          // Open PDF document in browser's new tab
          pdf.output('dataurlnewwindow')
  
          // Download PDF doc  
          pdf.save('Stock Level Report.pdf');
      }  
  }
