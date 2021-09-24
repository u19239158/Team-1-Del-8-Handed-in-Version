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
      "Content-Type": "application/json"
    })
};

  constructor(private http: HttpClient) { }

  Login(user: Login) {
    return this.http.post(`${this.server}Login/Login`, user, this.httpOptions);
  }

  GetUserByID(userid):  Observable<Login>  {
    return this.http.get<Login>(`${this.server}User/GetUserByID/${userid}`).pipe(map(res => res));
  } 
}