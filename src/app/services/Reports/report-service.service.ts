//import { Reports } from './../../interfaces/index';
import { Injectable } from '@angular/core';
import { Reports } from 'src/app/interfaces';
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

  constructor(private http: HttpClient) {}

PackingReport(): Observable<any>
{
  return this.http.get(`${this.server}Report/GetPackingReportData`).pipe(map(res => res))
}

DeliveryReport(): Observable<any>
{
  return this.http.get(`${this.server}Report/GetDeliveryReportData`).pipe(map(res => res))
}

SalesReport(Reports : Reports): Observable<any>
{
  return this.http.get(`${this.server}Report/GenerateSalesReport`).pipe(map(res => res))
}

StockLevelReport(Reports : Reports): Observable<any>
{
  return this.http.get(`${this.server}Report/GenerateStockLevel`).pipe(map(res => res))
}

FrequentBuyerReport(Reports : Reports): Observable<any>
{
  return this.http.get(`${this.server}Report/GenerateFrequentBuyerReport`).pipe(map(res => res))
}

FastSellingProductsReport(Reports : Reports): Observable<any>
{
  return this.http.get(`${this.server}Report/GetFastSellingProducts`).pipe(map(res => res))
}

SlowSellingProductsReport(Reports : Reports): Observable<any>
{
  return this.http.get(`${this.server}Report/GetSlowSellingProducts`).pipe(map(res => res))
}

PopularLocationReport(Reports : Reports): Observable<any>
{
  return this.http.get(`${this.server}Report/MostPopularLocation`).pipe(map(res => res))
}

}



