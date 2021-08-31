import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { BehaviorSubject } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

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
      grandTotal += a.productItemCost;
    })
    return grandTotal;
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

}
