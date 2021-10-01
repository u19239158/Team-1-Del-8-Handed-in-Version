import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { PlaceSupplierOrder, place } from 'src/app/interfaces';
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

  PlaceSupplierOrder(place:place):  Observable<place[]>  {
    return this.http.post<place[]>(`${this.server}SupplierOrder/PlaceSupplierOrder`, place,this.httpOptions);
  }
}
