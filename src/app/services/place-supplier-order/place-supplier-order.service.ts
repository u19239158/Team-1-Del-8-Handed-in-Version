import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { PlaceSupplierOrder } from 'src/app/interfaces';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaceSupplierOrderService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};
  constructor(private http: HttpClient) { }

  CreateSupplierOrder(PlaceSupplierOrder:PlaceSupplierOrder):  Observable<PlaceSupplierOrder[]>  {
    return this.http.post<PlaceSupplierOrder[]>(`${this.server}PlaceSupplierOrder/CreateSupplierOrder`, PlaceSupplierOrder,this.httpOptions);
  }
}
