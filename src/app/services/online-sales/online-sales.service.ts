import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OnlineSales} from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class OnlineSalesService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};

constructor(private http: HttpClient) { }

// GetOnlineSales():  Observable<OnlineSales[]>  {
//   return this.http.get<OnlineSales[]>(`${this.server}OnlineSales/GetOnlineSales`).pipe(map(res => res));
// }

ViewAllSales():  Observable<OnlineSales[]>  {
  return this.http.get<OnlineSales[]>(`${this.server}Sale/ViewAllSales`).pipe(map(res => res));
}

SearchSales(OrderStatusId):  Observable<OnlineSales>  {
  return this.http.get<OnlineSales>(`${this.server}Sale/SearchSales/${OrderStatusId}`).pipe(map(res => res));
}

getOrderStatusByID(OrderStatusId):  Observable<OnlineSales>  {
  return this.http.get<OnlineSales>(`${this.server}OrderStatus/GetOrderStatusByID/${OrderStatusId}`).pipe(map(res => res));
}

updateToCollected(OnlineSales:OnlineSales):  Observable<OnlineSales[]>  {
  return this.http.put<OnlineSales[]>(`${this.server}Sale/UpdateOrderDelivered`, OnlineSales,this.httpOptions);
}

updateToDelivered(OnlineSales:OnlineSales):  Observable<OnlineSales[]>  {
  return this.http.put<OnlineSales[]>(`${this.server}Sale/UpdateOrderDelivered`, OnlineSales,this.httpOptions);
}
}