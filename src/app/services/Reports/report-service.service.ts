import { ReportParameters, Reports } from './../../interfaces/index';
//import { Reports } from './../../interfaces/index';
import { Injectable } from '@angular/core';
//import { Reports } from 'src/app/interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { last, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {

  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // PackingReport(): Observable<Reports[]>
  // {
  //   return this.http.post<Reports[]>(`${this.server}Report/GetPackingReportData`).pipe(map(res => res))
  // }
  PackingReport(): Observable<any> {
    return this.http.get(`${this.server}Report/GetPackingReportData`).pipe(map(res => res))
  }

  // PackingReport(Reports:Reports):  Observable<Reports[]>  {
  //   return this.http.post<Reports[]>(`${this.server}Report/GetPackingReportData`, Reports,this.httpOptions);
  // }

  DeliveryReport(): Observable<any> {
    return this.http.get(`${this.server}Report/GetDeliveryReportData`).pipe(map(res => res))
  }

  SalesReport(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/GenerateSalesReport`, ReportParams).pipe(map(res => res))
  }

  
  SalesReportSum(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/GenerateSalesReportSum`, ReportParams).pipe(map(res => res))
  }
  

  SalesReportAvg(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/GenerateSalesReportAvg`, ReportParams).pipe(map(res => res))
  }

  StockLevelReport(): Observable<any> {
    return this.http.get(`${this.server}Report/GenerateStockLevel`).pipe(map(res => res))
  }

  FrequentBuyerReport(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/GenerateFrequentBuyerReport`, ReportParams).pipe(map(res => res))
  }

  FastSellingProductsReport(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/GetFastSellingProducts`, ReportParams).pipe(map(res => res))
  }

  SlowSellingProductsReport(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/GetSlowSellingProducts`, ReportParams).pipe(map(res => res))
  }

  PopularLocationReport(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/MostPopularLocationcount`, ReportParams).pipe(map(res => res))
  }

  // DashboardSales(ReportParams: ReportParameters): Observable<any> {
  //   return this.http.post(`${this.server}Report/DashboardSales`, ReportParams).pipe(map(res => res))
  // }
  DashboardSales(): Observable<any> {
    return this.http.get(`${this.server}Report/DashboardSales`).pipe(map(res => res))
  }

  DashboardPieSales(): Observable<any> {
    return this.http.get(`${this.server}Report/DashboardPieSales`).pipe(map(res => res))
  }

  SalesControl(ReportParams: ReportParameters): Observable<any> {
    return this.http.post(`${this.server}Report/SalesControl`, ReportParams).pipe(map(res => res))
  }
}



