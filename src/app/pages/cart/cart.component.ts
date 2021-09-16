import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { CartService, Sale } from 'src/app/services/service/cart.service';
import { AbstractControlOptions ,FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { SafeMethodCall } from '@angular/compiler';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { GoogleMapsComponent } from '../google-maps/google-maps.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface Coordinates {
  address: string;
  latitude: number;
  longitude: number;
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  addressform: FormGroup;

  isSubmitted = false;
  public products : any = [];
  public transaction : any =[];
  public grandTotal !: number;
  public  coordinates: Coordinates;

  constructor(
    private cartService : CartService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.coordinates = {} as Coordinates;
  }

  openGoogelMapsModal() {
    const modalRef = this.modalService.open(GoogleMapsComponent,
      {
        scrollable: true,
        // windowClass: 'myCustomModalClass',
        // keyboard: false,
        // backdrop: 'static'
      });
    let data = {
      prop1: 'Some Data',
      prop2: 'From Parent Component',
      prop3: 'This Can be anything'
    }

    modalRef.componentInstance.fromParent = data;
    modalRef.result.then((result) => {
      this.coordinates = result;
    }, (reason) => {
    });
  }

  ngOnInit() {
    const formOptions: AbstractControlOptions = { };

      
    //show products in cart
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
    

  }



//OUTSIDE ngOnInit

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

  closeDeliveryModal(){
    document.querySelector('#deliveryModal').classList.remove('is-active')
  }

  submitForm(form: NgForm) {
    this.isSubmitted = true;

    if(!form.valid) {
      return false;

    } else if(form.value.method=="delivery"){
      
      const customerEmail = this.email.value
      console.log("else if",form.value)
      console.log(customerEmail)
      
      document.querySelector('#deliveryModal').classList.add('is-active')
      document.querySelector('.modal').classList.remove('is-active')
    }
    else{
      const customerEmail = this.email.value
      
      console.log("else",form.value)
      console.log(customerEmail)
      
      document.querySelector('.modal').classList.remove('is-active')

      this.makePayment()
    }
  }

  createCustomerAddress(){
    const customerEmail = this.email.value
    console.log("yessssss")

    this.makePayment()
  }


  makePayment(){
    const data = {
      email: this.email.value,
      amount: this.grandTotal*100
    }
    this.cartService.paymentInit(data)
    .subscribe(res=>{
      console.log(res)
      window.open(res.data.authorization_url)
    })
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
