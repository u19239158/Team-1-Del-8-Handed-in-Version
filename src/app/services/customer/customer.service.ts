import { Customer } from './../../interfaces/index';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

    GetCustomer():  Observable<Customer[]>  {
      return this.http.get<Customer[]>(`${this.server}Customer/GetCustomer`).pipe(map(res => res));
    }

    getCustomerByID(customerid):  Observable<Customer>  {
      return this.http.get<Customer>(`${this.server}Customer/GetCustomerByID/${customerid}`).pipe(map(res => res));
    }

    CreateCustomer(Customer:Customer):  Observable<Customer[]>  {
      return this.http.post<Customer[]>(`${this.server}Customer/CreateCustomer`, Customer,this.httpOptions);
    }

    UpdateCustomer(Customer:Customer):  Observable<Customer[]>  {
      return this.http.put<Customer[]>(`${this.server}Customer/UpdateCustomer`, Customer,this.httpOptions);
    }

      DeleteCustomer(customerId):  Observable<Customer>  {
      return this.http.delete<Customer>(`${this.server}Customer/DeleteCustomer/${customerId}`).pipe(map(res => res));
    }
  }

//   KEY = 'customers';
//   constructor() { }

//   getAll(): Customer[] {
//     const customers = JSON.parse(localStorage.getItem(this.KEY));

//     if(!customers) {
//       const initialCustomer: Customer = {
//         customerId: 1,
//         customerUserName: 'Solutions',
//         customerName: 'DS3',
//         customerSurname: 'Solutions',
//         customerContactNumber: 3105408980,
//         customerEmail: 'DS3Solutions@gmail.com',
//         customerVat: 1234567890,
//         customerBusinessName: 'DS3Solutions',
//         customerPassword: '123DS3',
//       };
//       this.addCustomer(initialCustomer);
//       this.getAll();
//     }

//     return customers;
//   }
//       getCustomerById(customerId: number): Customer {
//         const customers: Customer[] = JSON.parse(localStorage.getItem(this.KEY));
//         return customers.find(x => x.customerId === customerId);
//       }

//       addCustomer(newCustomer: Customer): void {
//         const customers: Customer[] = JSON.parse(localStorage.getItem(this.KEY));

//         if (!customers) {
//           localStorage.setItem(this.KEY, JSON.stringify([newCustomer]));
//           return;
//         }

//         let lastId = Math.max(...customers.map(x => x.customerId));
//         newCustomer.customerId = lastId++;
//         localStorage.setItem(this.KEY, JSON.stringify([...customers, newCustomer]));
//       }

//       updateCustomer(updated: Customer): void {
//         const customers: Customer[] = JSON.parse(localStorage.getItem(this.KEY));
//         const index = customers.findIndex(x => x.customerId == updated.customerId);

//         if(index > -1) {
//           customers.splice(index, 1);
//           customers.push(updated);
//           localStorage.setItem(this.KEY, JSON.stringify([...customers]));
//         }
//       }

//       deleteCustomer(toDelete: Customer): void {
//         const customers: Customer[] = JSON.parse(localStorage.getItem(this.KEY));
//         const index = customers.findIndex(x => x.customerId == toDelete.customerId);

//         if(index > -1) {
//           customers.splice(index, 1);
//           localStorage.setItem(this.KEY, JSON.stringify([...customers]));
//         }
//       }

// }
