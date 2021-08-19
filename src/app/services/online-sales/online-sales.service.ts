import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { OnlineSales } from 'src/app/interfaces';
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

GetOnlineSales():  Observable<OnlineSales[]>  {
  return this.http.get<OnlineSales[]>(`${this.server}OnlineSales/GetOnlineSales`).pipe(map(res => res));
}
}