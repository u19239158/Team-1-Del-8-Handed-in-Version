import { AutofillMonitor } from '@angular/cdk/text-field';
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

  ngOnInit() {
    //PAYSTACK
    this.invokePaystack();
      
    //show products in cart
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }


//OUTSIDE ngOnInit

    //transaction- checkout button - tried using to go to Paystack website
    transactionCheckout(){
      this.transactionService.getTransaction()
      .subscribe(res=>{
        this.transaction =res;
        console.log(this.transaction)
      })
    }

//CART METHODS - Remove, clear items
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }


  
  makePayment(amount:any){
    const paymentHandler = (<any>window).paystackProvider.configure({
      //the key - got it from the PayStack website
      key:
      'sk_test_75906ab3946da8788599654f00b956f1dc111a72',
      
      //once payment is successful it will generate token
      locale: 'auto',
      token: function (paystackToken:any){
        console.log(paystackToken.card);
        alert('Paystack Token generated!');
      },
    });
    paymentHandler.open({
      name: 'NKAP Bolting',
      description: 'Checkout',
      amount: amount * 100,
    });
  }
    //PAYSTACK method
    invokePaystack(){
    if (!window.document.getElementById('paystack-script')){

      const script = window.document.createElement('script');
      script.id = 'paystack-script';
      script.type = 'text/html';
      script.src ="https://checkout.paystack.com/26ho92bd1vjeght";

      window.document.body.appendChild(script);
    }
  }
}
