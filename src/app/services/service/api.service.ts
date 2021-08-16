import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product 
{
  ProductItem_ID : number;
  ProductItem_Name : string;
  ProductItem_Description : string;
  ProductItem_Cost : number;
  Quantity_On_hand : number;
}

export interface CategoryType
{
  CategoryTypeDescription : string;
  ItemDescription : string;
  CategoryType_Image : ImageBitmap;
}

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  server = "https://localhost:44393/api";

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };

  constructor(private http : HttpClient) { }

  getCategoryType(): Observable<CategoryType[]>{
    return this.http.get<CategoryType[]>(`${this.server}CategoryType/GetCategoryType`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
  getProduct(){
    return this.http.get<any>("https://fakestoreapi.com/products")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
