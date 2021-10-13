import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtRequest } from '../models/jwt-request';
import { JwtResponse } from '../models/jwt-response';
import { tap, shareReplay } from 'rxjs/operators';
import { DateService } from '../services/service/date.service';

export interface Login {
    userUsername: string;
    userPassword: string;
    token : string;
    userId: number;
    userRoleId: number;
    otp: number
  }

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  

    server = "https://localhost:44393/api/";


    httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
    };

    // AddresshttpOptions = {
    //   headers: new HttpHeaders({
    //     Authorization: `Bearer ${this.Auth}`
    //   })
    // }

    constructor(private http: HttpClient, 
        private dateService: DateService
        ) {}

    Login(user: Login) {
        return this.http.post<Login>(`${this.server}Login/customerLogin`, user, this.httpOptions);
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

    // login(username: string, password: string): Observable<JwtResponse> {
    //     let jwtRequest: JwtRequest = { username: username, password: password };

    //     return this.http.post<JwtResponse>('http://localhost:4200/authenticate',
    //         jwtRequest).pipe(
    //             tap((resp: JwtResponse) => this.setSession(resp)),
    //             shareReplay()
    //         );
    }

//     private setSession(authResult: JwtResponse) {
//         const expiresAt = authResult.expirationDate;
//         console.log("Token expires at " + expiresAt);
//         console.log("Token date and time is " + this.dateService.getShortDateAndTimeDisplay(expiresAt));

//         localStorage.setItem('id_token', authResult.token);
//         localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
//     }

//     logout() {
//         localStorage.removeItem("id_token");
//         localStorage.removeItem("expires_at");
//     }

//     public isLoggedIn(): boolean {
//         return Date.now() < this.getExpiration();
//     }

//     isLoggedOut(): boolean {
//         return !this.isLoggedIn();
//     }

//     getExpiration(): number {
//         const expiration = localStorage.getItem("expires_at");
//         const expiresAt = JSON.parse(expiration);
//         return expiresAt;
//     }    
// }
