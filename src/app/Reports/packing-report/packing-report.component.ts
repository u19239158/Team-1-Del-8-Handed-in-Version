import { Reports } from 'src/app/interfaces';
import { Component, OnInit } from '@angular/core';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { MatTableDataSource } from '@angular/material/table'
import { Customer } from './../../interfaces/index';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-packing-report',
  templateUrl: './packing-report.component.html',
  styleUrls: ['./packing-report.component.scss']
})

export class PackingReportComponent implements OnInit {
  Reports: Reports[] = [];
  report: Reports;
  reports: Observable<Reports[]>;
  string : string;
  
  dataSource = new MatTableDataSource<Reports>();
  displayedColumns: string[] = ['saleId', 'saleOrderDate','saleOrderDescription', 'saleOrderRecieveType', 'orderStatusDescription', 'paymentDate'];

  constructor(private ReportServiceService: ReportServiceService 
  
  ) { }
  ngOnInit(): void {
    this.readPackingReport();

    // this.ReportServiceService.PackingReport().subscribe((result: Reports[]) => {
    //   this.Reports = result;
    // });
  }

  readPackingReport(): void {
    //const Report :Reports;
     this.ReportServiceService.PackingReport().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
  }

  header = [['Sale ID', 
              'Date', 
              'Description', 
              'Collection/Delivery',
              'Order Status',
              'Payment Date'
            ]]

  generatePdf() {
    var pdf = new jsPDF();
  
          pdf.setFontSize(2);
          pdf.text('Packing Report', 11, 8);
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

