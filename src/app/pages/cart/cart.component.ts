import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/service/cart.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {


  isSubmitted = false;
  public products : any = [];
  public transaction : any =[];
  public grandTotal !: number;
  constructor(private cartService : CartService) { }

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

    // //transaction- checkout button - tried using to go to Paystack website
    // transactionCheckout(){
    //   this.transactionService.getTransaction()
    //   .subscribe(res=>{
    //     this.transaction =res;
    //     console.log(this.transaction)
    //   })
    // }

//CART METHODS - Remove, clear items
  removeItem(item: any){
    this.cartService.removeCartItem(item);
  }
  emptycart(){
    this.cartService.removeAllCart();
  }


  openmodal(){
    document.querySelector('.modal').classList.add('is-active')
  }
  close(){
    document.querySelector('.modal').classList.remove('is-active')
  }

  
  // openDeliveryModal(){
  //   document.querySelector('#deliveryModal').classList.add('is-active')
  //   document.querySelector('.modal').classList.remove('is-active')
  // }
  closeDeliveryModal(){
    document.querySelector('#deliveryModal').classList.remove('is-active')
  }
  submitForm(form: NgForm) {
    this.isSubmitted = true;
    if(!form.valid) {
      return false;
    } else if(form.value=='delivery'){
      // alert(JSON.stringify(form.value))
      document.querySelector('#deliveryModal').classList.add('is-active')
      // document.querySelector('.modal').classList.remove('is-active')
    }
    else{
      //alert(JSON.stringify(form.value))
      document.querySelector('#deliveryModal').classList.add('is-active')
      // window.location.href='https://checkout.paystack.com/26ho92bd1vjeght'
    }
  }
  makePayment(){
    const data = {
      email: 'u19072912@tuks.co.za',
      amount: this.grandTotal*100
    }
    this.cartService.paymentInit(data)
    .subscribe(res=>{
      console.log(res)
      window.open(res.data.authorization_url)
    })
  
//     data: {authorization_url: "https://checkout.paystack.com/gd6vsc1ntkdnl4x", access_code: "gd6vsc1ntkdnl4x", reference: "h64xkamnbs"}
// message: "Authorization URL created"
// status: tru
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
