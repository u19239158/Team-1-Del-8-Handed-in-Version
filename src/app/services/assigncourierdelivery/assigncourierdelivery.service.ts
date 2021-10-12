import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Courier, OnlineSales } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AssignCourierDeliveryService { server = "https://localhost:44393/api/";


httpOptions = {
  headers: new HttpHeaders({
    ContentType: 'application/json'
  })
};

// KEY = 'userRoles';
constructor(private http: HttpClient) { }

GeCourier():  Observable<Courier[]>  {
  return this.http.get<Courier[]>(`${this.server}Courier/GetCourier`).pipe(map(res => res));
}

getCourierByID(courierid):  Observable<Courier>  {
  return this.http.get<Courier>(`${this.server}Courier/GetCourierByID/${courierid}`).pipe(map(res => res));
}

CreateCourier(Courier:Courier):  Observable<Courier[]>  {
  return this.http.post<Courier[]>(`${this.server}Courier/CreateCourier`, Courier,this.httpOptions);
}

UpdateCouriere(Courier:Courier):  Observable<Courier[]>  {
  return this.http.put<Courier[]>(`${this.server}Courier/UpdateCourier`, Courier,this.httpOptions);
}

  DeleteCourier(courierId):  Observable<Courier>  {
  return this.http.delete<Courier>(`${this.server}Courier/DeleteCourier/${courierId}`).pipe(map(res => res));
}

GetFullSaleByID(saleID):  Observable<OnlineSales>  {
  return this.http.get<OnlineSales>(`${this.server}Email/GetFullSaleByID/${saleID}`).pipe(map(res => res));
}

AssignCourier(id: any):  Observable<Courier[]>  {

  return this.http.put<Courier[]>(`${this.server}Delivery/AssignCourier`, id,this.httpOptions);
}


// NotifyCourier():  Observable<OnlineSales>  {
//   return this.http.get<OnlineSales>(`${this.server}Email/NotifyCourier/${CourierEmail}`).pipe(map(res => res));
// }

NotifyCourier(Courier:Courier,courierEmail: string):  Observable<Courier[]>  {
  return this.http.post<Courier[]>(`${this.server}Email/NotifyCourier/${courierEmail}`,Courier,this.httpOptions);
}

// NotifyCourier(OnlineSales: OnlineSales):  Observable<OnlineSales[]>  {
//   return this.http.get<OnlineSales[]>(`${this.server}Email/NotifyCourier`, ).pipe(map(res => res));
// }
}
