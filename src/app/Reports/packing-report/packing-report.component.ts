import { Reports } from 'src/app/interfaces';
import { Component, OnInit } from '@angular/core';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { MatTableDataSource } from '@angular/material/table'
import { Customer } from './../../interfaces/index';
import { Observable } from 'rxjs';
import html2canvas from 'html2canvas';

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
      PDF.save('Packing Report.pdf');
    });
  }
  }

