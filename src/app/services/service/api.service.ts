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

export interface Special {
  specialID: number;
  specialImage: string;
  specialDescription: string;
  specialPrice: string;
  specialStartDate: string;
  specialEndDate: string;
  discountId: number;
  productItemId: number;
  productItemCost: number;
  discountPercentage:number;
}


export interface CategoryType
{
  ProductCategoryID : number;
  CategoryTypeDescription : string;
  ItemDescription : string;
  CategoryTypeImage : ImageBitmap;
}

export interface ProductCategory
{
  map(arg0: (y: any) => any): any;
  ProductCategory_Description : string;
  ProductCategory_Image : string;
}

export interface ProductItem
{
  CategoryType_Description : string;
  Item_Description : string;
  CategoryType_Image : ImageBitmap;
}
export interface Discount
{
  DiscountPercentage : number;
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
  getProductCategory(): Observable<any>{
    return this.http.get(`${this.server}ProductCategory/GetProdCat`)
    // .pipe(map((res:any)=>{
    //   return res;
    // }))

  }   
  getProductByCategoryTypeID(categoryTypeid): Observable<any>{
    return this.http.get(`${this.server}ProductItem/GetProdByProductCategory/${categoryTypeid}`)
    

    // .pipe(map((res:any)=>{
    //   return res;
    // }))

  }  

  


  //products page(CategoryType) SEARCH description endpoint route = GetCategoryTypeByProdDesc/{productcategorydescription} OR GetCategoryTypeByDescription/{categorytypedescription}

  //products page(CategoryType) SEARCH ID endpoint route = GetCategoryTypeByID/{categorytypeid}

  //products page(CategoryType) endpoint route = CategoryType/GetCategoryType
  getCategoryType(): Observable<CategoryType[]>{
    return this.http.get<CategoryType[]>(`${this.server}Checkout/getProductWPrice`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  //product details modal(CategoryType, productItem) SEARCH id endpoint route = GetPItemsByID/{productitemid}

  //product details modal(CategoryType, productItem) SEARCH ProductItemname endpoint route = GetPItemsByName/{ProductItemname} 

  //product details modal(CategoryType, productItem) SEARCH CategoryTypeName endpoint route = GetPItemsByCatType/{CategoryTypeName}

  //product details modal(CategoryType, productItem) endpoint route = GetProductItems
  // getProductItem(){
  //   return this.http.get<Product[]>(`${this.server}ProductItem/getProducts`)
  //   .pipe(map((res:any)=>{
  //     return res;
  //   }))
  // }
  getProductItem(){
    return this.http.get<Product[]>(`${this.server}Checkout/getProductWPrice`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getAllItems(){
    return this.http.get<Product[]>(`${this.server}Checkout/getProducts`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getDiscount(){
    return this.http.get<Product[]>(`${this.server}Discount/GetDiscount`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  GetSpecial():  Observable<Special[]>  {
    return this.http.get<Special[]>(`${this.server}Special/GetSpecials`)
    .pipe(map((res:any)=>{
    return res;
    }))
  }

 
}
