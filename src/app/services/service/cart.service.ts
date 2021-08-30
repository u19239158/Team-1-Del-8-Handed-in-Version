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
  
  //for the modal
  // public productItems = new BehaviorSubject<any>([]);
  // public modalItems : any =[]
  
  constructor() { }


  getProducts(){
    return this.productList.asObservable();
  }

  setProduct(product : any){
    this.cartItemList.push(...product);
    this.productList.next(product);
  }
  

  // setmodalProduct(modal : any){
  //   this.modalItems.push(...modal);
  //   this.cartItemList.next(modal);
  //   console.log(this.cartItemList)
  //   console.log(this.modalItems)
  //   console.log(modal)
  // }
  
//save modalItems array to some other array and then display the second one in the cart page
  //use modal data
  // addtoCart(product : any){
  //   console.log(this.modalItems) //this displays what is in the modal currently
  //   this.cartItemList.push(product);
  //   this.productList.next(this.cartItemList);
  //   //this.getTotalPrice();
  //   console.log(this.cartItemList)
  // }

  addtoCart(product : any){
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();
    console.log(this.cartItemList)
  }

  // showItemModal(product : any){
  //   console.log(product)
  //   console.log(this.productItems)
  //   this.modalItems.push(product);
  //   this.productItems.next(this.modalItems);
  //   console.log(this.modalItems)
  // }
  
  // closeItemModal(product : any){    
  //   this.modalItems =[];
  //   console.log(this.modalItems)
  // }

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
