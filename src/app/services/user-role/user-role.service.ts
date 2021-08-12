import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { UserRole } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface UserRole {
  userRoleId: number;
  userRoleName: string;
  userRoleDescription: string;
}

@Injectable({
  providedIn: 'root'
})

export class UserRoleService {
  // url = 'http://localhost:443939/api/Employee';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     ContentType: 'application/json'
  //   })
  // };

  KEY = 'userRoles';
  constructor(private http: HttpClient) { }

  getAll(): UserRole[] {
    const userRoles = JSON.parse(localStorage.getItem(this.KEY));

    if(!userRoles) {
      const initialUserRole: UserRole = {
        userRoleId: 1,
        userRoleName: 'Admin',
        userRoleDescription: 'Administrator',
      };
      this.addUserRole(initialUserRole);
      this.getAll();
    }

    return userRoles;
  }
      getUserRoleById(userRoleID: number): UserRole {
        const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));
        return userRoles.find(x => x.userRoleId === userRoleID);
      }

      addUserRole(newUserRole: UserRole): void {
        const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));

        if (!userRoles) {
          localStorage.setItem(this.KEY, JSON.stringify([newUserRole]));
          return;
        }

        let lastId = Math.max(...userRoles.map(x => x.userRoleId));
        newUserRole.userRoleId = lastId++;
        localStorage.setItem(this.KEY, JSON.stringify([...userRoles, newUserRole]));
      }

      // addEmployee(newEmployee: Employee) {
      //   return this.http.post<Employee>(`${this.server}/Employee/Add`, employee, this.httpOptions);
      // }

      updateUserRole(updated: UserRole): void {
        const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));
        const index = userRoles.findIndex(x => x.userRoleId == updated.userRoleId);

        if(index > -1) {
          userRoles.splice(index, 1);
          userRoles.push(updated);
          localStorage.setItem(this.KEY, JSON.stringify([...userRoles]));
        }
      }

      // updateEmployee(updated: Employee) {
      //   return this.http.put<Employee>(`${this.server}/Employee/Update`, employee, this.httpOptions);
      // }
      deleteUserRole(toDelete: UserRole): void {
        const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));
        const index = userRoles.findIndex(x => x.userRoleId == toDelete.userRoleId);

        if(index > -1) {
          userRoles.splice(index, 1);
          localStorage.setItem(this.KEY, JSON.stringify([...userRoles]));
        }
      }
    }
