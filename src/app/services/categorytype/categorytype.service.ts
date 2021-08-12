import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Categorytype } from 'src/app/interfaces';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorytypeService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};
  constructor(private http: HttpClient) { }

  GetCategoryType():  Observable<Categorytype[]>  {
    return this.http.get<Categorytype[]>(`${this.server}Categorytype/GetCategoryType`).pipe(map(res => res));
  }

  getCategoryTypeByID(categoryTypeid):  Observable<Categorytype>  {
    return this.http.get<Categorytype>(`${this.server}Categorytype/GetCategoryTypeByID/${categoryTypeid}`).pipe(map(res => res));
  }

  CreateCategoryType(Categorytype:Categorytype):  Observable<Categorytype[]>  {
    return this.http.post<Categorytype[]>(`${this.server}Categorytype/CreateCategoryType`, Categorytype,this.httpOptions);
  }

  UpdateCategoryType(Categorytype:Categorytype):  Observable<Categorytype[]>  {
    return this.http.put<Categorytype[]>(`${this.server}Categorytype/UpdateCategoryType`, Categorytype,this.httpOptions);
  }

    DeleteCategoryType(categoryTypeId):  Observable<Categorytype>  {
    return this.http.delete<Categorytype>(`${this.server}Categorytype/DeleteCategoryType/${categoryTypeId}`).pipe(map(res => res));
  }
}

  // getAll(): Categorytype[] {
  //   const categorytypes = JSON.parse(localStorage.getItem(this.KEY));

  //   if(!categorytypes) {
  //     const initialCategorytype: Categorytype = {
  //       id: 1,
  //       categoryType: 'small bolts',
  //       productCategoryName: 'Product Category 1',
  //     };
  //     this.addCategorytype(initialCategorytype);
  //     this.getAll();
  //   }

  //   return categorytypes;
  // }

  // getCategorytypeById(id: number): Categorytype {
  //   const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));
  //   return categorytypes.find(x => x.id === id);
  // }

  // addCategorytype(newCategorytype: Categorytype): void {
  //   const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));

  //   if (!categorytypes) {
  //     localStorage.setItem(this.KEY, JSON.stringify([newCategorytype]));
  //     return;
  //   }

  //   let lastId = Math.max(...categorytypes.map(x => x.id));
  //   newCategorytype.id = lastId++;
  //   localStorage.setItem(this.KEY, JSON.stringify([...categorytypes, newCategorytype]));
  // }

  // updateCategorytype(updated: Categorytype): void {
  //   const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));
  //   const index = categorytypes.findIndex(x => x.id == updated.id);

  //   if(index > -1) {
  //     categorytypes.splice(index, 1);
  //     categorytypes.push(updated);
  //     localStorage.setItem(this.KEY, JSON.stringify([...categorytypes]));
  //   }
  // }

  // deleteCategorytype(toDelete: Categorytype): void {
  //   const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));
  //   const index = categorytypes.findIndex(x => x.id == toDelete.id);

  //   if(index > -1) {
  //     categorytypes.splice(index, 1);
  //     localStorage.setItem(this.KEY, JSON.stringify([...categorytypes]));
  //   }
  // }

