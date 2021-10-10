import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Sale 
{
  SaleID : number;
  SaleOrderDescription : string;
  SaleOrderDate : Date;
  SaleOrderRecieveType : number;
  PaymentAmount : number;
  PaymentDate : Date;
  OrderStatusId : number;
  PaymentTypeId : number;
  StartDate: Date;
  EndDate: Date;
  OrderStatusDescription: string;
  CustomerID: number;
  ProductItemId: number;
  ProductItemName: string;
  SaleLineID: number;
  SaleLineQuantity: number;
  //DeliveryDistance: string;
  AddressId : number;
}

export interface Address {
  addressId: number;
  //customerId: number;
  ProvinceDescription: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressPostalCode: string;
}

export interface Collection {
  //customerId: number;
  CollectionID: number;
}

export interface OnlineSale {
  customerId: number;
  paymentAmount: number;
  productItemId: number;
  salelineQuantity: number;
  productItemName: string;
 
}

export interface Delivery {
  //customerId: number;
  DeliveryID: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
    server = "https://localhost:44393/api/";

    httpOptions = {
      headers: new HttpHeaders({
        ContentType: 'application/json'
      })
  };
  public cartItemList : any =[]
  public qtyProd = new BehaviorSubject<any>([]);
  //for the producst page
  public productList = new BehaviorSubject<any>([]);
   headers={
    //  headers: new HttpHeaders({
    //   'Authorization':`Bearer sk_test_75906ab3946da8788599654f00b956f1dc111a72`,
    //   'Content-Type': `application/json`,
    //  }),    
     headers: new HttpHeaders({
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ1MTkwNzI5MTJAdHVrcy5jby56YSIsImFwaV90b2tlbiI6Im8xWkNzVmtmdnFTS3ZNNHNxd0RRZE90d0FmNVZ3NzFvNDgtV3FJUHF6ZjZlUkJWUUdrT1YtZUdYYmlnTkVDYnhSdXcifSwiZXhwIjoxNjMzNjU4OTA5fQ.qbDSBb64eHD_Qh8AI6osIIl9LY8uuAjKpqZilNU1FTc",
        "Accept": "application/json",
        //"api-token": "o1ZCsVkfvqSKvM4sqwDQdOtwAf5Vw71o48-WqIPqzf6eRBVQGkOV-eGXbigNECbxRuw",
        //"user-email": "u19072912@tuks.co.za"
     }) 
   }
 
  constructor(
    private http:HttpClient) { 
      { idKey: 'productId' };
    }
//https://www.universal-tutorial.com/api/states/South Africa
//https://www.universal-tutorial.com/api/cities/Gauteng
//post req

  paymentInit(item:any){
    console.log(item)
    return this.http.post<any>('https://api.paystack.co/transaction/initialize',item, this.headers)
  }
  
  Provinces(){
    return this.http.get<any>("https://www.universal-tutorial.com/api/states/South Africa", this.headers)  
  }

  Cities(province:any){
    return this.http.get<any>(`https://www.universal-tutorial.com/api/cities/${province}`, this.headers)  
  }
  
  Checkout(Sale:any){
    return this.http.post<any>(`${this.server}Checkout/Checkout`, Sale,this.httpOptions)
  }

  GetAddressByCustID(customerid):  Observable<any>  {
    return this.http.get<any>(`${this.server}Address/GetAddressByCustID/${customerid}`).pipe(map(res => res));
  }

  AddCustomerAddress(Address:Address):Observable<Address>  {
    return this.http.post<Address>(`${this.server}Checkout/AddAddress`, Address,this.httpOptions);
  }

  postDelivery(Delivery:Delivery):Observable<Delivery[]>{
    return this.http.post<Delivery[]>(`${this.server}Checkout/Delivery`,Delivery ,this.httpOptions);

  }
  postCollection(Sale:any):Observable<any>{
    return this.http.post<any>(`${this.server}Checkout/CollectionCheckout`, Sale,this.httpOptions);
  }

  CollectionCheckout(place:any):  Observable<any>  {
    return this.http.post<any>(`${this.server}Checkout/CollectionCheckout`, place,this.httpOptions);
  }
  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    let currentCart = this.productList.value;
    const quantity = this.qtyProd.value;
    console.log(quantity)
    console.log(currentCart)
    
    //see if can found product we adding
    const index = currentCart.findIndex(x=>x.productitemid===product.productitemid)
    if (index > -1){
      quantity.SaleLineQuantity+=1;
      
      this.productList.next(currentCart)
    }
    else{
      currentCart.push(product)
      this.productList.next(currentCart);
      quantity.SaleLineQuantity=1;
    }
    //this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(currentCart.length)
    console.log(currentCart)
    return quantity;
  }

  


  getTotalPrice() : number{
    let grandTotal = 0;
    let currentCart = this.productList.value;
    currentCart.map((a:any)=>{
      grandTotal += a.num*a.VATInc;
    })
    console.log(grandTotal);
    return grandTotal;
  }

  getVATPrice() : number{
    let currentCart = this.productList.value;
    let vatTotals = 0;
    currentCart.map((a:any)=>{
      vatTotals += a.num*a.VATAmount;      
    })
    console.log(vatTotals);
    return vatTotals;
  }

  removeCartItem(product: any){
    let currentCart = this.productList.value;
    currentCart = currentCart.filter(x=>x.productItemId!==product.productItemId)

    this.productList.next(currentCart);
  }
  removeAllCart(){
    let currentCart = this.productList.value;
    currentCart = []
    this.productList.next(currentCart);
  }


}
