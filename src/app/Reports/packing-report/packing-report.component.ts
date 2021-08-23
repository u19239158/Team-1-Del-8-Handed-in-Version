import { Component, OnInit } from '@angular/core';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { MatTableDataSource } from '@angular/material/table'
import { Customer } from './../../interfaces/index';

@Component({
  selector: 'app-packing-report',
  templateUrl: './packing-report.component.html',
  styleUrls: ['./packing-report.component.scss']
})

export class PackingReportComponent implements OnInit {
  constructor(private service: ReportServiceService ) { }
  dataSource = new MatTableDataSource<Customer>();
  displayedColumns: string[] = ['saleId', 'date','description', 'collectionDelivery', 'assignedTo', 'paymentDate'];

  ngOnInit(): void {
    //this.readPackingReport();
  }

  // readPackingReport(): void {
  //    this.service.PackingReport(Reports : Reports).subscribe(res => {
  //      console.log(res)
  //      this.dataSource = new MatTableDataSource(res)
  //    })
  // }

  header = [['Sale ID', 
              'Date', 
              'Description', 
              'Collection/Delivery',
              'Assigned To',
              'Payment Date'
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

