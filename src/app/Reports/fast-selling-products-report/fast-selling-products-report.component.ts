import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import jsPDF from 'jspdf' ;
import 'jspdf-autotable' ;
import { Observable } from 'rxjs';
import { ReportServiceService } from 'src/app/services/Reports/report-service.service';

@Component({
  selector: 'app-fast-selling-products-report',
  templateUrl: './fast-selling-products-report.component.html',
  styleUrls: ['./fast-selling-products-report.component.scss']
})
export class FastSellingProductsReportComponent implements OnInit {
  fastSellingProductsData: any;
  created = false;

  constructor(private reportService: ReportServiceService) { }

  ngOnInit(): void {
  }

  // generateReport() {
  //   let products: any[] =  [];
  //   //let averages: number[] =  [];
  //   const counts: any[] =  [];
  //   this.reportService.FastSellingProductsReport().subscribe(data => {
  //     this.created = false;
  //     // Restructure data for chart
  //     products = data.map(x => x.ProductName);
  //     //averages = data.map(x => x.AverageQuantityOrdered)

  //     // Generate Chart
  //     //this.generateChart(products, averages)

  //     // Call table data method
  //     this.generateTables(data);
  //   });
  // }

  generateTables(data) {
    this.fastSellingProductsData = data;
  }

  header = [['Product Item ID',
            'Product Item Name',
            'Quantity Sold',
            'Number of Sales']]

    tableData = [
        [1, 'John', 'john@yahoo.com', 'HR'],
        [2, 'Angel', 'angel@yahoo.com', 'Marketing'],
        [3, 'Harry', 'harry@yahoo.com', 'Finance'],
        [4, 'Anne', 'anne@yahoo.com', 'Sales'],
        [5, 'Hardy', 'hardy@yahoo.com', 'IT'],
        [6, 'Nikole', 'nikole@yahoo.com', 'Admin'],
        [7, 'Sandra', 'Sandra@yahoo.com', 'Sales'],
        [8, 'Lil', 'lil@yahoo.com', 'Sales']
    ]

  generatePdf() {
    var pdf = new jsPDF();

    pdf.setFontSize(2);
    pdf.text('Fast Selling Products Report', 11, 8);
    pdf.setFontSize(12);
    pdf.setTextColor(99);


    (pdf as any).autoTable({
    head: this.header,
    body: this.tableData,
    theme: 'plain',
    didDrawCell: data => {
        console.log(data.column.index)
    }
    })

    // Open PDF document in browser's new tab
    pdf.output('dataurlnewwindow')

    // Download PDF doc
    pdf.save('table.pdf');
}


  // downloadPDF() {
  //   const doc = new jsPDF();

  //   const pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
  //   const pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  //   const length = this.fastSellingProductsData.length;
  //   //const names = this.fastSellingProductsData.map(tit => tit.ProductName);
  //   //const averages = this.fastSellingProductsData.map(avg => avg.AverageQuantityOrdered);

  //   let finalY = 160;
  //   //const newCanvas =   document.querySelector('#avgChart') as HTMLCanvasElement;

  //   //const newCanvasImg = newCanvas.toDataURL('image/png', 1.0);

  //   // Creates pdf

  //   doc.setFontSize(30);

  //   doc.text('Fast Selling Products Report', (pageWidth / 2) - 60, 15);
  //   //doc.addImage(newCanvasImg, 'PNG', 25, 25, 160, 150);
  //   doc.setFontSize(14);

  //   for (let i = 0; i < length; i++) {
  //     //doc.text(`${names[i]} (Average: ${averages[i]})`, (pageWidth / 3) - 25, finalY + 23);

  //     doc.autoTable({
  //       startY: finalY + 25,
  //       html: `#testing${i}`,
  //       useCss: true,
  //       head: [
  //         [
  //           'Product Item ID',
  //           'Product Item Name',
  //           'Quantity Sold',
  //           'Number of Sales'
  //         ]
  //       ]
  //     });
  //     finalY = doc.autoTable.previous.finalY;
  //   }
  //   doc.save('table.pdf');
  // }
}
