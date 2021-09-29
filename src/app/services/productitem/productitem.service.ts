import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Productitem, WriteOffStock } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductitemService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};

  // KEY = 'productitems';
  constructor(private http: HttpClient) { }

  GetProductItem():  Observable<Productitem[]>  {
    return this.http.get<Productitem[]>(`${this.server}Productitem/GetProductItemsWPrice`).pipe(map(res => res));
  }

  getProductItemByID(ProductItemid):  Observable<Productitem>  {
    return this.http.get<Productitem>(`${this.server}Productitem/GetPItemsByID/${ProductItemid}`).pipe(map(res => res));
  }

  getProductByCatType(categoryTypeId):  Observable<Productitem>  {
    return this.http.get<Productitem>(`${this.server}ProductItem/GetPItemsByCatType/${categoryTypeId}`).pipe(map(res => res));
  }


  CreateProductItem(Productitem:Productitem):  Observable<Productitem[]>  {
    return this.http.post<Productitem[]>(`${this.server}Productitem/CreateProductItem`, Productitem,this.httpOptions);
  }

  UpdateProductItem(Productitem:Productitem):  Observable<Productitem[]>  {
    return this.http.put<Productitem[]>(`${this.server}Productitem/UpdateProductItem`, Productitem,this.httpOptions);
  }

  DeleteProductitem(Productitem:Productitem):  Observable<Productitem[]>  {
    return this.http.post<Productitem[]>(`${this.server}Productitem/DeleteProductitem`, Productitem,this.httpOptions);
  }

  //   DeleteProductitem(ProductItemId):  Observable<Productitem>  {
  //   return this.http.delete<Productitem>(`${this.server}Productitem/DeleteProductItem/${ProductItemId}`).pipe(map(res => res));
  // }

}

//   getAll(): Productitem[] {
//     const productitems = JSON.parse(localStorage.getItem(this.KEY));

//     if(!productitems) {
//       const initialProductitem: Productitem = {
//         id: 1,
//         name: 'Bolt',
//         description: '6mm',
//         cost: 65,
//         quantity: 40,
//         categorytype: 'Product Category 1',
//       };
//       this.addProductitem(initialProductitem);
//       this.getAll();
//     }

//     return productitems;
//   }

//   getProductitemById(id: number): Productitem {
//     const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));
//     return productitems.find(x => x.id === id);
//   }

//   addProductitem(newProductitem: Productitem): void {
//     const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));

//     if (!productitems) {
//       localStorage.setItem(this.KEY, JSON.stringify([newProductitem]));
//       return;
//     }

//     let lastId = Math.max(...productitems.map(x => x.id));
//     newProductitem.id = lastId++;
//     localStorage.setItem(this.KEY, JSON.stringify([...productitems, newProductitem]));
//   }

//   updateProductitem(updated: Productitem): void {
//     const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));
//     const index = productitems.findIndex(x => x.id == updated.id);

//     if(index > -1) {
//       productitems.splice(index, 1);
//       productitems.push(updated);
//       localStorage.setItem(this.KEY, JSON.stringify([...productitems]));
//     }
//   }

//   deleteProductitem(toDelete: Productitem): void {
//     const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));
//     const index = productitems.findIndex(x => x.id == toDelete.id);

//     if(index > -1) {
//       productitems.splice(index, 1);
//       localStorage.setItem(this.KEY, JSON.stringify([...productitems]));
//     }
//   }
// }
