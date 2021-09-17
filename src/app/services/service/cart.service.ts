import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

export interface Sale 
{
  SaleID : number;
  SaleOrderDescription : string;
  // SaleOrderDate : Date;
  SaleOrderRecieveType : number;
  PaymentAmount : number;
  // PaymentDate : Date;
  // OrderStatusId : number;
  // PaymentTypeId : number;
  // StartDate: Date;
  // EndDate: Date;
  // OrderStatusDescription: string;
  // CustomerID: number;
  // ProductItemId: number;
  // ProductItemName: string;
  // SaleLineID: number;
  // SaleLineQuantity: number;
  // DeliveryDistance: string;
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
  //for the producst page
  public productList = new BehaviorSubject<any>([]);
   headers={
     headers: new HttpHeaders({
      'Authorization':`Bearer sk_test_75906ab3946da8788599654f00b956f1dc111a72`,
      'Content-Type': `application/json`
     })
   }
  
  constructor(private http:HttpClient) { }
//post req
  paymentInit(item:any){
    console.log(item)
    return this.http.post<any>('https://api.paystack.co/transaction/initialize',item, this.headers)
  }


  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  getTotalPrice() : number{
    let grandTotal = 0;
    this.cartItemList.map((a:any)=>{
      grandTotal += a.sellingPrice;
    })
    return grandTotal;
  }

  getVATPrice() : number{
    let vatTotals = 0;
    this.cartItemList.map((a:any)=>{
      vatTotals += a.vatTotal;
    })
    console.log(vatTotals);
    return vatTotals;
  }

  removeCartItem(product: any){
    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }

  CreateCustomerAddress(Address:Address):Observable<Address[]>  {
    return this.http.post<Address[]>(`${this.server}Checkout/AddAddress`, Address,this.httpOptions);
  }

}
