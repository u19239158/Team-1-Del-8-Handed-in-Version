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

  // GetProductItemByCategoryType(:WriteOffStock) {
  //   return this.http.post<WriteOffStock[]>(`${this.server}GetPItemsByCatType/{CategoryTypeName}`, WriteOffStock,this.httpOptions);
  // }

}
