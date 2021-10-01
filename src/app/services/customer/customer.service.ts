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
  titleID: number;
  titleDesc: string;
  usersId: number;
}

export interface User {
  customerId: number;
  userUsername: string;
  customerName: string;
  customerSurname: string;
  customerCellphoneNumber: number;
  customerEmailAddress: string;
  customerVATReg: number;
  customerBusinessName: string;
  userPassword: string;
  titleID: number;
  titleDesc: string;
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
  collection: any = [];

  constructor(private http: HttpClient) { }

  GetCustomer(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.server}Customer/GetCustomer`)
      .pipe(map((res: any) => {
        return res;
      }))
  }

  getCustomerByID(userid): Observable<Customer> {
    return this.http.get<Customer>(`${this.server}Customer/GetCustomerByID/${userid}`)
      .pipe(map(res => res));
  }

  GetProfile(userid): Observable<Customer> {
    return this.http.get<Customer>(`${this.server}Customer/GetProfile/${userid}`)
      .pipe(map(res => res));
  }


  // CreateCustomer(Customer:Customer):  Observable<Customer[]>  {
  //   return this.http.post<Customer[]>(`${this.server}Customer/CreateCustomer`, Customer,this.httpOptions);
  // }

  UpdateCustomer(Customer: Customer): Observable<Customer[]> {
    return this.http.put<Customer[]>(`${this.server}Customer/UpdateCustomer`, Customer, this.httpOptions);
  }

  UpdateProfile(Customer: Customer): Observable<Customer[]> {
    return this.http.put<Customer[]>(`${this.server}Customer/UpdateProfile`, Customer, this.httpOptions);
  }

    DeleteCustomer(customerId):  Observable<Customer>  {
    return this.http.delete<Customer>(`${this.server}Customer/DeleteCustomer/${customerId}`).pipe(map(res => res));
  }


  Register(User:User):  Observable<User[]>  {
    return this.http.post<User[]>(`${this.server}Login/Register`, User,this.httpOptions);
  }
}
