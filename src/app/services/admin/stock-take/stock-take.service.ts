//import { StockTake } from './../../../interfaces/index';
import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Productitem, StockTake } from 'src/app/interfaces';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockTakeService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getProductByCatType(categoryTypeId):  Observable<Productitem[]>  {
    return this.http.get<Productitem[]>(`${this.server}ProductItem/GetPItemsByCatType/${categoryTypeId}`).pipe(map(res => res));
  }

  StockTake(StockTake:StockTake):  Observable<StockTake[]>  {
    return this.http.post<StockTake[]>(`${this.server}StockTake/DoStockTake`, StockTake,this.httpOptions);
  }

  getProductItemByID(ProductItemId):  Observable<Productitem>  {
    return this.http.get<Productitem>(`${this.server}Productitem/GetPItemsByID/${ProductItemId}`).pipe(map(res => res));
  }

  getStockTake():  Observable<StockTake[]>  {
    return this.http.get<StockTake[]>(`${this.server}StockTake/GetStockTake`).pipe(map(res => res));
  }
}
