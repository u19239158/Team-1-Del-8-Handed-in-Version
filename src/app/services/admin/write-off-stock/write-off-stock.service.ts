//import { WriteOffStock } from './../../../interfaces/index';
import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Productitem, WriteOffStock } from 'src/app/interfaces';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WriteOffStockService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};
  constructor(private http: HttpClient) { }

  CreateWriteOffStock(WriteOffStock:WriteOffStock):  Observable<WriteOffStock[]>  {
    return this.http.post<WriteOffStock[]>(`${this.server}WriteOffStock/CreateWriteOffStock`, WriteOffStock,this.httpOptions);
  }

  getProductByCatType(categoryTypeId):  Observable<Productitem[]>  {
    return this.http.get<Productitem[]>(`${this.server}ProductItem/GetPItemsByCatType/${categoryTypeId}`).pipe(map(res => res));
  }

  getWriteOff():  Observable<WriteOffStock[]>  {
    return this.http.get<WriteOffStock[]>(`${this.server}WriteOff/GetProductItemWrittenOffStocks`).pipe(map(res => res));
  }

  WriteOffStock(WriteOffStock:WriteOffStock):  Observable<WriteOffStock[]>  {
    return this.http.post<WriteOffStock[]>(`${this.server}WriteOff/WriteOffStock`, WriteOffStock,this.httpOptions);
  }
}

