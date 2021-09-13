import { Reports } from 'src/app/interfaces';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { MatTableDataSource } from '@angular/material/table'
import { Customer } from './../../interfaces/index';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-delivery-report',
  templateUrl: './delivery-report.component.html',
  styleUrls: ['./delivery-report.component.scss']
})
export class DeliveryReportComponent implements OnInit {
  Reports: Reports;
  @ViewChild('htmlData') htmlData: ElementRef | any;
  constructor(private service: ReportServiceService

  ) { }


  dataSource = new MatTableDataSource<Reports>();
  displayedColumns: string[] = ['saleId', 'orderStatusDescription', 'saleOrderDate', 'customerName', 'customerCellphoneNumber', 'customerEmailAddress', 'customerAddress'];


  ngOnInit(): void {
    this.readDeliveryReport();
  }

  readDeliveryReport(): void {
    this.service.DeliveryReport().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource(res)
    })
  }

  header = [['Sale ID',
    'Date',
    'Customer ID',
    'CustomerName',
    'Customer Email Address',
    'Customer Address'
  ]]

  // generatePdf() {
  // var pdf = new jsPDF();

  //       pdf.setFontSize(2);
  //       pdf.text('Stock Level Report', 11, 8);
  //       pdf.setFontSize(12);
  //       pdf.setTextColor(99);


  //       (pdf as any).autoTable({
  //       head: this.header,
  //       body: this.dataSource,
  //       theme: 'plain',
  //       didDrawCell: data => {
  //           console.log(data.column.index)
  //       }
  //       })

  //       // Open PDF document in browser's new tab
  //       pdf.output('dataurlnewwindow')

  //       // Download PDF doc
  //       pdf.save('Stock Level Report.pdf');
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
      PDF.save('Delivery Report.pdf');
    });
  }

}
