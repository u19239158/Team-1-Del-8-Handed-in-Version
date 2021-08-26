import { Reports, Productitem } from './../../interfaces/index';
import { Component, OnInit } from '@angular/core';
//import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-stock-level-report',
  templateUrl: './stock-level-report.component.html',
  styleUrls: ['./stock-level-report.component.scss']
})

export class StockLevelReportComponent implements OnInit {
  dataSource = new MatTableDataSource<Reports>();
  displayedColumns: string[] = ['productCategory', 'categoryType','productItemId', 'productItemName', 'quantityOnHand'];

  constructor(private service: ReportServiceService ) { }

  ngOnInit(): void {
    this.readStockLevel();
  }

  readStockLevel(): void {
     this.service.StockLevelReport().subscribe(res => {
       console.log(res)
       this.dataSource = new MatTableDataSource(res)
     })
  }

  header = [['Product Category', 
              'Category Type', 
              'Product Item ID', 
              'Product Item Name',
              'Quantity on Hand'
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
