import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';


export interface Customer {
  customerId: number;
  customerUserName: string;
  customerName: string;
  customerSurname: string;
  customerCellphoneNumber: number;
  customerEmailAddress: string;
  customerVATReg: number;
  customerBusinessName: string;
  customerPassword: string;
  titleId: number;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  server = "https://localhost:44393/api/";

    httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
  };

    constructor(private http: HttpClient) { }

    GetCustomer():  Observable<Customer[]>{
      return this.http.get<Customer[]>(`${this.server}Customer/GetCustomer`)
      .pipe(map((res :any)=>{
        return res;
      }))
    }
    
    // getCustomerByID(customerid):  Observable<Customer>  {
    //   return this.http.get<Customer>(`${this.server}Customer/GetCustomerByID/${customerid}`).pipe(map(res => res));
    // }

    // CreateCustomer(Customer:Customer):  Observable<Customer[]>  {
    //   return this.http.post<Customer[]>(`${this.server}Customer/CreateCustomer`, Customer,this.httpOptions);
    // }

    // UpdateCustomer(Customer:Customer):  Observable<Customer[]>  {
    //   return this.http.put<Customer[]>(`${this.server}Customer/UpdateCustomer`, Customer,this.httpOptions);
    // }

    //   DeleteCustomer(customerId):  Observable<Customer>  {
    //   return this.http.delete<Customer>(`${this.server}Customer/DeleteCustomer/${customerId}`).pipe(map(res => res));
    // }

  
  }
