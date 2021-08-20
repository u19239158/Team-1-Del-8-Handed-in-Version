import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Deliveryshift} from 'src/app/interfaces';
import { Employee} from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssigndeliveryshiftService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};

constructor(private http: HttpClient) { }

AssignDeliveryShifts(Employee:Employee):  Observable<Employee[]>  {
    return this.http.post<Employee[]>(`${this.server}Employee/AssignDeliveryShift`, Employee,this.httpOptions);
  }

}
