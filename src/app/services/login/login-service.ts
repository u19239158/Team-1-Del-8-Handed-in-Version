import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Login, Log } from 'src/app/interfaces';

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

  Logout(UsersID: any) {
    return this.http.post(`${this.server}Login/Logout/${UsersID}`, UsersID, this.httpOptions);
  }
  ResetPassword(user: Login) {
    return this.http.post(`${this.server}Login/ForgotResetPassword`, user, this.httpOptions);
  }

  ResetPasswordOTP(user: Login) {
    return this.http.post(`${this.server}Login/ResetPasswordOTP`, user, this.httpOptions);
  }
  
}