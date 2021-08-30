import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product 
{
  ProductItem_ID : number;
  ProductItem_Name : string;
  ProductItem_Description : string;
  ProductItem_Cost : number;
  Quantity_On_hand : number;
}

export interface Transaction 
{
  email : string;
  amount : number;
  currency : string;
}

@Injectable({
  providedIn: 'root'
})

export class TransactionService {
  //server = "https://api.paystack.co/transaction/";
  //https://api.paystack.co/transaction/initialize
server = "https://checkout.paystack.com";

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };

  //this should be a POST method
  constructor(private http : HttpClient) { }
  initTransaction(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.server}/26ho92bd1vjeght`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }   

  getTransaction(): Observable<Transaction[]>{
    return this.http.get<Transaction[]>(`${this.server}26ho92bd1vjeght`)
    .pipe(map((res:any)=>{
      return res;
    }))
  } 
}
