import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { CartService, Sale } from 'src/app/services/service/cart.service';
import { AbstractControlOptions ,FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { SafeMethodCall } from '@angular/compiler';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


export interface Coordinates {
  address: string;
  latitude: number;
  longitude: number;
}
export interface Address {
  customerId: number;
  ProvinceDescription: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  AddressPostalCode: string;
}

export interface Collection {
  customerId: number;
  CollectionID: number;
}

export interface Delivery {
  customerId: number;
  DeliveryID: number;
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
  public vatTotals !: number;
  public grandTotal !: number;
  public  coordinates: Coordinates;
  public provinceList : any = [];
  public cityList : any = [];
  Address: Address;
  selectedOption: string;
  selectedOption2: string;

  constructor(
    private router: Router,
    private cartService : CartService,
    private snack : MatSnackBar,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.coordinates = {} as Coordinates;
  }


  ngOnInit() {


    const formOptions: AbstractControlOptions = { };

    const AddressformOptions: AbstractControlOptions = {};
    this.addressform = this.formBuilder.group({
    AddressLine1 : new FormControl('', [Validators.required]),
    addressline2 : new FormControl('', [Validators.required]),
    addressline3 : new FormControl(''),
    city : new FormControl('', [Validators.required]),
    province : new FormControl('', [Validators.required]),
    postalCode : new FormControl('', [Validators.required,Validators.maxLength(4)])
  }, AddressformOptions );

    
    //show products in cart
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      
      this.grandTotal = this.cartService.getTotalPrice();      
      this.vatTotals = this.cartService.getVATPrice();
      
      console.log(this.products)
    })
    
    //populateProvince
    this.cartService.Provinces()
    .subscribe(res=>{
      this.provinceList = res;
      return this.provinceList;    
    })
  }


//OUTSIDE ngOnInit
  populateCities(){
    this.cartService.Cities(this.selectedOption)
    .subscribe(res=>{
      this.cityList = res;
    })
  }

  onBlur(){
    console.log('blurred lines')
    this.populateCities()    
  }

reloadCurrentPage(){
  this.router.navigate([this.router.url]);
  this.cartService.getTotalPrice();
  this.grandTotal = this.cartService.getTotalPrice();      
  this.vatTotals = this.cartService.getVATPrice();
}

//CART METHODS - Remove, clear items
  removeItem(item: any){
    this.cartService.removeCartItem(item);
    
    this.snack.open('Item removed from cart', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000
    });

  }
  emptycart(){
    this.cartService.removeAllCart();

    this.snack.open('Cart emptied', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000
    });
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
      const delivery: Delivery = form.value;
      this.cartService.postDelivery(delivery)
      .subscribe(res => {
        console.log(res)
      })
    }
    else{
      const customerEmail = this.email.value
      
      console.log("else",form.value)
      console.log(customerEmail)
      
      document.querySelector('.modal').classList.remove('is-active')
      const collection: Collection = form.value;
      this.cartService.postCollection(collection)
      .subscribe(res => {
        console.log(res)
      })
      this.makePayment()
    }
  }

  submitAddressForm() {

      const address: Address = this.addressform.value;
      console.log(address)
      this.cartService.AddCustomerAddress(address).subscribe(res => {
        console.log(res)
        if(!this.addressform.valid) {
          return false;
    
        } else if(this.addressform.value.city=="Port Shepstone"){
          //Port Shepstone, Margate, Hibberdene, Port Edward, South Broom, Shelley Beach, Umtentweni, Ramsgate
          console.log("local things")
        }
        else{
          console.log("courier vibes")
        }
        document.querySelector('.modal').classList.remove('is-active')

      //this.cartService.Checkout(form);
      //this.makePayment();
    })
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

}


