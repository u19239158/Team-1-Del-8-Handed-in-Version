import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};

  constructor(private http: HttpClient) { }

  Login(user: Login) {
    return this.http.post<Login>(`${this.server}Login/Login`, user, this.httpOptions);
  }
}