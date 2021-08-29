import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Productitem, Special } from 'src/app/interfaces';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SpecialService {

  server = 'https://localhost:44393/api/';
  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };

  // KEY = 'specials';
  constructor(private http: HttpClient) { }

  GetSpecial():  Observable<Special[]>  {
    return this.http.get<Special[]>(`${this.server}Special/GetSpecials`).pipe(map(res => res));
  }

  getSpecialByID(specialID):  Observable<Special>  {
    return this.http.get<Special>(`${this.server}Special/GetSpecialsByID/${specialID}`).pipe(map(res => res));
  }

  getProductItemByID(ProductItemid):  Observable<Productitem>  {
    return this.http.get<Productitem>(`${this.server}Productitem/GetPItemsByID/${ProductItemid}`).pipe(map(res => res));
  }

  getSpecialByProductItemID(productItemId):  Observable<Special>  {
    return this.http.get<Special>(`${this.server}Special/GetSpecialsByProductItemId/${productItemId}`).pipe(map(res => res));
  }

  CreateSpecial(Special:Special):  Observable<Special[]>  {
    return this.http.post<Special[]>(`${this.server}Special/CreateSpecials`, Special,this.httpOptions);
  }

  UpdateSpecial(Special:Special):  Observable<Special[]>  {
    return this.http.put<Special[]>(`${this.server}Special/UpdateSpecials`, Special,this.httpOptions);
  }

  // DeleteSpecials(Special:Special):  Observable<Special[]>  {
  //   return this.http.delete<Special[]>(`${this.server}Special/DeleteSpecials`).pipe(map(res => res))
  // }

  DeleteSpecials():  Observable<Special>  {
    return this.http.delete<Special>(`${this.server}Special/DeleteSpecials`).pipe(map(res => res));
  }

  //   DeleteSpecial(specialId,Special:Special):  Observable<Special[]>  {
  //   return this.http.delete<Special[]>(`${this.server}Special/DeleteSpecials/${specialId}`).pipe(map(res => res));
  // }
}
  // getAll(): Special[] {
  //   const specials = JSON.parse(localStorage.getItem(this.KEY));

  //   if(!specials) {
  //     const initialSpecial: Special = {
  //       id: 1,
  //       specialImage: '',
  //       specialDescription: '2 Bolts',
  //       specialPrice: 'R45',
  //       specialStartDate: '05/05/2021',
  //       specialEndDate: '30/05/2021',
  //     };
  //     this.addSpecial(initialSpecial);
  //     this.getAll();
  //   }

  //   return specials;
  // }

  // // getSpecial():  Observable<Special[]>  {
  // //   return this.http.get<Special[]>(`${this.server}/Special/GetSpecial`).pipe(map(res => res));
  // // }

  // getSpecialById(id: number): Special {
  //   const specials: Special[] = JSON.parse(localStorage.getItem(this.KEY));
  //   return specials.find(x => x.id === id);
  // }

  // addSpecial(newSpecial: Special): void {
  //   const specials: Special[] = JSON.parse(localStorage.getItem(this.KEY));

  //   if (!specials) {
  //     localStorage.setItem(this.KEY, JSON.stringify([newSpecial]));
  //     return;
  //   }

  //   let lastId = Math.max(...specials.map(x => x.id));
  //   newSpecial.id = lastId++;
  //   localStorage.setItem(this.KEY, JSON.stringify([...specials, newSpecial]));
  // }

  // // addSpecial(newSpecial: Special) {
  // //   return this.http.post<Special>(`${this.server}/Special/Add`, special, this.httpOptions);
  // // }

  // updateSpecial(updated: Special): void {
  //   const specials: Special[] = JSON.parse(localStorage.getItem(this.KEY));
  //   const index = specials.findIndex(x => x.id == updated.id);

  //   if(index > -1) {
  //     specials.splice(index, 1);
  //     specials.push(updated);
  //     localStorage.setItem(this.KEY, JSON.stringify([...specials]));
  //   }
  // }

  // // updateSpecial(updated: Special) {
  // //   return this.http.put<Special>(`${this.server}/Special/Update`, special, this.httpOptions);
  // // }
  // deleteSpecial(toDelete: Special): void {
  //   const specials: Special[] = JSON.parse(localStorage.getItem(this.KEY));
  //   const index = specials.findIndex(x => x.id == toDelete.id);

  //   if(index > -1) {
  //     specials.splice(index, 1);
  //     localStorage.setItem(this.KEY, JSON.stringify([...specials]));
  //   }
  // }

  // // deleteSpecial(toDelete: Special) {
  // //   return this.http.delete<Special>(`${this.server}/Special/Add`, special, this.httpOptions);
  // // }

