import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Courier } from 'src/app/interfaces';

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
}
