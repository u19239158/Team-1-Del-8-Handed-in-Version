import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

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
  //customerId: number;
  ProvinceID: number;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressPostalCode: string;
}

export interface Collection {
  //customerId: number;
  CollectionID: number;
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
     headers: new HttpHeaders({
      'Authorization':`Bearer sk_test_75906ab3946da8788599654f00b956f1dc111a72`,
      'Content-Type': `application/json`
     })
   }
  
  constructor(
    private http:HttpClient) { 
      { idKey: 'productId' };
    }

  
//post req
  paymentInit(item:any){
    console.log(item)
    return this.http.post<any>('https://api.paystack.co/transaction/initialize',item, this.headers)
  }

  Checkout(Sale:Sale){
    return this.http.post<any>(`${this.server}Checkout/Checkout`, Sale,this.httpOptions)
  }
  DeliverMethodSelected(){
    this.postCollection
    this.postDelivery
  }
  CreateCustomerAddress(Address:Address):Observable<Address[]>  {
    return this.http.post<Address[]>(`${this.server}Checkout/AddAddress`, Address,this.httpOptions);
  }

  postDelivery(Delivery:Delivery):Observable<Address[]>{
    return this.http.post<Address[]>(`${this.server}Checkout/AddSaleline`,Delivery ,this.httpOptions);

  }
  postCollection(Collection:Collection):Observable<Address[]>{
    return this.http.post<Address[]>(`${this.server}Checkout/AddSaleline`, Collection,this.httpOptions);

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
