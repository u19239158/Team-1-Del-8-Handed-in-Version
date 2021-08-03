import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Employee } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  server = 'https://localhost:44308/api/';
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };
  KEY = 'employees';
  constructor(private http: HttpClient) { }

  getAll(): Employee[] {
    const employees = JSON.parse(localStorage.getItem(this.KEY));

    if(!employees) {
      const initialEmployee: Employee = {
        id: 1,
        title: 'Mr',
        firstName: 'Name',
        lastName: 'Surname',
        contactNumber: '0600055555',
        dateOfBirth: '5 May',
        idNumber: '0101010101',
        addressLine1: '3 Far Far',
        addressLine2: 'Awaaaay',
        addressLine3: 'Kude kabi',
        cityTown: 'Weeeeh',
        postalCode: '4678'
      };
      this.addEmployee(initialEmployee);
      this.getAll();
    }

    return employees;
  }

  // getEmployee():  Observable<Employees[]>  {
  //   return this.http.get<Employees[]>(`${this.server}/Employee/GetEmployees`).pipe(map(res => res));
  // }

  getEmployeeById(id: number): Employee {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.KEY));
    return employees.find(x => x.id === id);
  }

  addEmployee(newEmployee: Employee): void {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!employees) {
      localStorage.setItem(this.KEY, JSON.stringify([newEmployee]));
      return;
    }

    let lastId = Math.max(...employees.map(x => x.id));
    newEmployee.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...employees, newEmployee]));
  }

  // addEmployee(newEmployee: Employee) {
  //   return this.http.post<Employee>(`${this.server}/Employee/Add`, employee, this.httpOptions);
  // }

  updateEmployee(updated: Employee): void {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = employees.findIndex(x => x.id == updated.id);

    if(index > -1) {
      employees.splice(index, 1);
      employees.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...employees]));
    }
  }

  // updateEmployee(updated: Employee) {
  //   return this.http.put<Employee>(`${this.server}/Employee/Update`, employee, this.httpOptions);
  // }
  deleteEmployee(toDelete: Employee): void {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = employees.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      employees.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...employees]));
    }
  }

  // deleteEmployee(toDelete: Employee) {
  //   return this.http.delete<Employee>(`${this.server}/Employee/Add`, employee, this.httpOptions);
  // }
}
