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
  CategoryType_Description : string;
  Item_Description : string;
  CategoryType_Image : ImageBitmap;
}

export interface ProductCategory
{
  ProductCategoryDesc : string;
  ProductCategoryImage : string;
}

export interface ProductItem
{
  CategoryType_Description : string;
  Item_Description : string;
  //CategoryType_Image : ImageBitmap;
}
@Injectable({
  providedIn: 'root'
})

export class ApiService {
  server = "https://localhost:44393/api/";

  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  };

  constructor(private http : HttpClient) { }
  //home page(ProductCategory) SEARCH id endpoint route = GetPCByID/{productcategoryid}
  //home page(ProductCategory) SEARCH description endpoint route = GetPCByDescription/{ProductCategoryDescription}
  //home page(ProductCategory) endpoint route = GetProdCat
  getProductCategory(): Observable<ProductCategory[]>{
    return this.http.get<ProductCategory[]>(`${this.server}GetProdCat`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }   
  //products page(CategoryType) SEARCH description endpoint route = GetCategoryTypeByProdDesc/{productcategorydescription} OR GetCategoryTypeByDescription/{categorytypedescription}
  //products page(CategoryType) SEARCH ID endpoint route = GetCategoryTypeByID/{categorytypeid}
  //products page(CategoryType) endpoint route = CategoryType/GetCategoryType
  getCategoryType(): Observable<CategoryType[]>{
    return this.http.get<CategoryType[]>(`${this.server}CategoryType/GetCategoryType`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //product details modal(CategoryType, productItem) SEARCH id endpoint route = GetPItemsByID/{productitemid}
  //product details modal(CategoryType, productItem) SEARCH ProductItemname endpoint route = GetPItemsByName/{ProductItemname} 
  //product details modal(CategoryType, productItem) SEARCH CategoryTypeName endpoint route = GetPItemsByCatType/{CategoryTypeName}
  //product details modal(CategoryType, productItem) endpoint route = GetProductItems
  
   getProduct(){
     return this.http.get<any>("https://fakestoreapi.com/products")
     .pipe(map((res:any)=>{
       return res;
     }))
   }
}
