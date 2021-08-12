import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Productcategory } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};
  //KEY = 'productcategorys';
  constructor(private http: HttpClient) { }

  GetProductCategory():  Observable<Productcategory[]>  {
    return this.http.get<Productcategory[]>(`${this.server}Productcategory/GetProductCategory`).pipe(map(res => res));
  }

  getProductCategoryByID(ProductCategoryid):  Observable<Productcategory>  {
    return this.http.get<Productcategory>(`${this.server}Productcategory/GetProductCategoryByID/${ProductCategoryid}`).pipe(map(res => res));
  }

  CreateProductCategory(Productcategory:Productcategory):  Observable<Productcategory[]>  {
    return this.http.post<Productcategory[]>(`${this.server}Productcategory/CreateProductCategory`, Productcategory,this.httpOptions);
  }

  UpdateProductCategory(Productcategory:Productcategory):  Observable<Productcategory[]>  {
    return this.http.put<Productcategory[]>(`${this.server}Productcategory/UpdateProductCategory`, Productcategory,this.httpOptions);
  }

    DeleteProductCategory(productcategoryId):  Observable<Productcategory>  {
    return this.http.delete<Productcategory>(`${this.server}Productcategory/DeleteUserRole/${productcategoryId}`).pipe(map(res => res));
  }
}
//   getAll(): Productcategory[] {
//     const productcategorys = JSON.parse(localStorage.getItem(this.KEY));

//     if(!productcategorys) {
//       const initialProductcategory: Productcategory = {
//         id: 1,
//         productCategoryName: 'Bolts',
//       };
//       this.addProductcategory(initialProductcategory);
//       this.getAll();
//     }

//     return productcategorys;
//   }

//   getProductcategoryById(id: number): Productcategory {
//     const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));
//     return productcategorys.find(x => x.id === id);
//   }

//   addProductcategory(newProductcategory: Productcategory): void {
//     const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));

//     if (!productcategorys) {
//       localStorage.setItem(this.KEY, JSON.stringify([newProductcategory]));
//       return;
//     }

//     let lastId = Math.max(...productcategorys.map(x => x.id));
//     newProductcategory.id = lastId++;
//     localStorage.setItem(this.KEY, JSON.stringify([...productcategorys, newProductcategory]));
//   }

//   updateProductcategory(updated: Productcategory): void {
//     const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));
//     const index = productcategorys.findIndex(x => x.id == updated.id);

//     if(index > -1) {
//       productcategorys.splice(index, 1);
//       productcategorys.push(updated);
//       localStorage.setItem(this.KEY, JSON.stringify([...productcategorys]));
//     }
//   }

//   deleteProductcategory(toDelete: Productcategory): void {
//     const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));
//     const index = productcategorys.findIndex(x => x.id == toDelete.id);

//     if(index > -1) {
//       productcategorys.splice(index, 1);
//       localStorage.setItem(this.KEY, JSON.stringify([...productcategorys]));
//     }
//   }
//
