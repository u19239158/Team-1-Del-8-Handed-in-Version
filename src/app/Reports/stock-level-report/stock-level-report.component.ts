import { Reports, Productitem } from './../../interfaces/index';
import { Component, OnInit } from '@angular/core';
//import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import jsPDF from 'jspdf';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';

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
      PDF.save('Stock Report.pdf');
    });
  }
  
  header = [['Product Category', 
              'Category Type', 
              'Product Item ID', 
              'Product Item Name',
              'Quantity on Hand'
            ]]

   
}
