import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { UserRole } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {
  url = 'http://localhost:65389/Api/UserRole';

  constructor(private http: HttpClient) { }

  getAllUserRole(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(this.url + '/AlUserRoleDetails');
  }
  getUserRoleById(userRoleId: string): Observable<UserRole> {
    return this.http.get<UserRole>(this.url + '/GetUserRoleDetailsById/' + userRoleId);
  }
  createUserRole(userRole: UserRole): Observable<UserRole> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.post<UserRole>(this.url + '/InsertUserRoleDetails/',
    userRole, httpOptions);
  }
  updateUserRole(userRole: UserRole): Observable<UserRole> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.put<UserRole>(this.url + '/UpdateUserRoleDetails/',
    userRole, httpOptions);
  }
  deleteUserRoleById(UserRoleid: string): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };
    return this.http.delete<number>(this.url + '/DeleteUserRoleDetails?id=' +UserRoleid,
 httpOptions);
  }
}


  // server = 'https://localhost:44308/api/';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     ContentType: 'application/json'
  //   })
  // };

  // KEY = 'userRoles';
  // constructor(private http: HttpClient) { }

  // getAll(): UserRole[] {
  //   const userRoles = JSON.parse(localStorage.getItem(this.KEY));

  //   if(!userRoles) {
  //     const initialUserRole: UserRole = {
  //       id: 1,
  //       userRoleName: 'Admin',
  //       userRoleDescription: 'Capable of anything',
  //     };
  //     this.addUserRole(initialUserRole);
  //     this.getAll();
  //   }

  //   return userRoles;
  // }

  // // getUserRole():  Observable<UserRoles[]>  {
  // //   return this.http.get<UserRoles[]>(`${this.server}/UserRole/GetUserRoles`).pipe(map(res => res));
  // // }

  // getUserRoleById(id: number): UserRole {
  //   const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));
  //   return userRoles.find(x => x.id === id);
  // }

  // addUserRole(newUserRole: UserRole): void {
  //   const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));

  //   if (!userRoles) {
  //     localStorage.setItem(this.KEY, JSON.stringify([newUserRole]));
  //     return;
  //   }

  //   let lastId = Math.max(...userRoles.map(x => x.id));
  //   newUserRole.id = lastId++;
  //   localStorage.setItem(this.KEY, JSON.stringify([...userRoles, newUserRole]));
  // }

  // // addUserRole(newUserRole: UserRole) {
  // //   return this.http.post<UserRole>(`${this.server}/UserRole/Add`, userRole, this.httpOptions);
  // // }

  // updateUserRole(updated: UserRole): void {
  //   const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));
  //   const index = userRoles.findIndex(x => x.id == updated.id);

  //   if(index > -1) {
  //     userRoles.splice(index, 1);
  //     userRoles.push(updated);
  //     localStorage.setItem(this.KEY, JSON.stringify([...userRoles]));
  //   }
  // }

  // // updateUserRole(updated: UserRole) {
  // //   return this.http.put<UserRole>(`${this.server}/UserRole/Update`, userRole, this.httpOptions);
  // // }

  // deleteUserRole(toDelete: UserRole): void {
  //   const userRoles: UserRole[] = JSON.parse(localStorage.getItem(this.KEY));
  //   const index = userRoles.findIndex(x => x.id == toDelete.id);

  //   if(index > -1) {
  //     userRoles.splice(index, 1);
  //     localStorage.setItem(this.KEY, JSON.stringify([...userRoles]));
  //   }
  // }

  // deleteUserRole(toDelete: UserRole) {
  //   return this.http.delete<UserRole>(`${this.server}/UserRole/Add`, userRole, this.httpOptions);
  // }

