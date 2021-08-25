import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/service/cart.service';
import { TransactionService } from 'src/app/services/service/transaction.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  public products : any = [];
  public transaction : any =[];
  public grandTotal !: number;
  constructor(private cartService : CartService, private transactionService: TransactionService) { }


  ngOnInit(): void {

    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      console.log(this.products)
      // this.grandTotal = this.cartService.getTotalPrice();      
    })

    this.cartService.getModalProduct()
    .subscribe(res=>{
      this.products = res;
    })

  }

  //transaction
  transactionCheckout(item:any){
    this.transactionService.getTransaction()
    .subscribe(res=>{
      this.transaction =res;
      console.log(this.transaction)
    })
  }
  
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }


}
