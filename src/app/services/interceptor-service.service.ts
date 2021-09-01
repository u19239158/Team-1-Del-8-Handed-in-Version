import { Login } from './../interfaces/index';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, observable } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class InterceptorServiceService {

  server = "https://localhost:44393/api/";

  loggedIn : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authDomain = `${this.server}/Login`

  get isLoggedIn() : Observable<boolean>
  {
    const session = this.getauthorisationtoken();
    if (session)
    {
      this.loggedIn.next(true);
    }
    else
    {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  getauthorisationtoken() : string | undefined 
  {
    return localStorage.getItem('authToken')
  }

  Login(auth : any) : Observable<any>
  {
    return this.http.post(`${this.server}Login/Login`, auth)
  } 

  constructor( private http : HttpClient) {
  }
}
