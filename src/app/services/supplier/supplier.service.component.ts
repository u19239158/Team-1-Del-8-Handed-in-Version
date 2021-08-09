import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Supplier } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  // server = 'https://localhost:44308/api/';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     ContentType: 'application/json'
  //   })
  // };

  KEY = 'suppliers';
  constructor(private http: HttpClient) { }

  getAll(): Supplier[] {
    const suppliers = JSON.parse(localStorage.getItem(this.KEY));

    if(!suppliers) {
      const initialSupplier: Supplier = {
        id: 1,
        supplierName: 'Hardware',
        supplierType: 'Bolts',
        supplierEmailAddress: 'Hardware@outlook.com',
        supplierContactNumber: '0105060102',
        supplierAddressLine1: '3 Hardware Store',
        supplierAddressLine2: 'Pinetown',
        supplierAddressLine3: 'Umhlanga',
        supplierCityTown: 'Durban',
        supplierPostalCode: '4096',
      };
      this.addSupplier(initialSupplier);
      this.getAll();
    }

    return suppliers;
  }

  // getSupplier():  Observable<Supplier[]>  {
  //   return this.http.get<Supplier[]>(`${this.server}/Supplier/GetSupplier`).pipe(map(res => res));
  // }

  getSupplierById(id: number): Supplier {
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem(this.KEY));
    return suppliers.find(x => x.id === id);
  }

  addSupplier(newSupplier: Supplier): void {
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!suppliers) {
      localStorage.setItem(this.KEY, JSON.stringify([newSupplier]));
      return;
    }

    let lastId = Math.max(...suppliers.map(x => x.id));
    newSupplier.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...suppliers, newSupplier]));
  }

  // addSupplier(newSupplier: Supplier) {
  //   return this.http.post<Supplier>(`${this.server}/Supplier/Add`, supplier, this.httpOptions);
  // }

  updateSupplier(updated: Supplier): void {
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = suppliers.findIndex(x => x.id == updated.id);

    if(index > -1) {
      suppliers.splice(index, 1);
      suppliers.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...suppliers]));
    }
  }

  // updateSupplier(updated: Supplier) {
  //   return this.http.put<Supplier>(`${this.server}/Supplier/Update`, supplier, this.httpOptions);
  // }
  deleteSupplier(toDelete: Supplier): void {
    const suppliers: Supplier[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = suppliers.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      suppliers.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...suppliers]));
    }
  }

  // deleteSupplier(toDelete: Supplier) {
  //   return this.http.delete<Supplier>(`${this.server}/Supplier/Add`, supplier, this.httpOptions);
  // }
}
