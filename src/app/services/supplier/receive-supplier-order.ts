import { ReceiveSupplierOrder } from './../../interfaces/index';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReceiveSupplerService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};

  constructor(private http: HttpClient) { }

  ReceiveSupplierOrder():  Observable<ReceiveSupplierOrder[]>  {
    return this.http.get<ReceiveSupplierOrder[]>(`${this.server}ReceiveSupplierOrder/ReceiveSupplierOrder`).pipe(map(res => res));
  }

}
