import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Employee } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  KEY = 'employees';
  constructor() { }

  /**
   *
   * @returns an array of type User
   * This function reads all of the users from localStorage, if nothing is found it'll add an initial user to the
   * localStorage key and recursively call itself again to read the users again.
   */
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

  
  updateEmployee(updated: Employee): void {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = employees.findIndex(x => x.id == updated.id);

    if(index > -1) {
      employees.splice(index, 1);
      employees.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...employees]));
    }
  }

  deleteEmployee(toDelete: Employee): void {
    const employees: Employee[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = employees.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      employees.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...employees]));
    }
  }
}
