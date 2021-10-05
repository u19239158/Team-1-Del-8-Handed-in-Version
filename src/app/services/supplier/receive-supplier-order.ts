import { PlaceSupplierOrder } from 'src/app/interfaces';
import { ReceiveSupplierOrder } from './../../interfaces/index';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiveSupplierService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};

  constructor(private http: HttpClient) { }

  ReceiveSupplierOrder(place:any):  Observable<any>  {
    return this.http.post<any>(`${this.server}SupplierOrder/ReceiveInvoice`, place,this.httpOptions);
  }

  GetSupplierOrder():  Observable<ReceiveSupplierOrder[]>  {
    return this.http.get<ReceiveSupplierOrder[]>(`${this.server}SupplierOrder/GetSupplierOrder`).pipe(map(res => res));
  }

  getSupplierOrderByID(SupplierOrderId):  Observable<ReceiveSupplierOrder[]>  {
    return this.http.get<ReceiveSupplierOrder[]>(`${this.server}SupplierOrder/GetSupplierOrderByID/${SupplierOrderId}`).pipe(map(res => res));
  }

}
