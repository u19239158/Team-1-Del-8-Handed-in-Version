import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { CartService, OnlineSale, Sale,  } from 'src/app/services/service/cart.service';
import { AbstractControlOptions ,FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { SafeMethodCall } from '@angular/compiler';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer,CustomerService } from 'src/app/services/customer/customer.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';


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
  addressId: number;
}

export interface Collection {
  customerId: number;
  CollectionID: number;
}

export interface Delivery {
  customerId: number;
  DeliveryID: number;
}

export class order{
  num : number;
  productitemid: number;
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
  public products : order[] = [];
  public transaction : any =[];
  public vatTotals !: number;
  public grandTotal !: number;
  public  coordinates: Coordinates;
  public provinceList : any = [];
  public cityList : any = [];
  Address: Address;
  selectedOption: string;
  selectedOption2: string;

  Customer: Customer;
  userid : number;
  addy: Address
  addyID : number;
  constructor(
    private router: Router,
    private cartService : CartService,
    private snack : MatSnackBar,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private customerService: CustomerService,
  ) {
    this.coordinates = {} as Coordinates;
  }


  ngOnInit() {

   
    const AddressformOptions: AbstractControlOptions = {};
    this.addressform = this.formBuilder.group({
    AddressLine1 : new FormControl('', [Validators.required]),
    addressline2 : new FormControl('', [Validators.required]),
    addressline3 : new FormControl(''),
    cityDescription : new FormControl('', [Validators.required]),
    provinceDescription : new FormControl('', [Validators.required]),
    addressPostalCode : new FormControl('', [Validators.required,Validators.maxLength(4)])
  }, AddressformOptions);

    
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
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   this.userid = obj.userId
   this.customerService.GetProfile(this.userid).subscribe(res => {
    this.Customer = res})
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
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    if(obj == null){
      this.snack.open('You are not logged in. Please login to checkout.', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000
        });
        this.router.navigateByUrl('/login')
    }
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
      
      const customerEmail = this.Customer.customerEmailAddress
      console.log("else if",form.value)
      console.log(customerEmail)

      this.cartService.GetAddressByCustID(this.Customer.customerId).subscribe(res => {
        this.addy = res
        console.log(res)
      })

      document.querySelector('#deliveryModal').classList.add('is-active')
      document.querySelector('.modal').classList.remove('is-active')
      const delivery: Delivery = form.value;
    }
    else{
      const customerEmail = this.Customer.customerEmailAddress
      
      console.log("else",form.value)
      console.log(customerEmail)
      document.querySelector('.modal').classList.remove('is-active')
      console.log(this.products)
      const Sale = {
        customerId : this.Customer.customerId,
        paymentAmount : this.grandTotal,
        saleLists: this.products
      }
       console.log(Sale)
      this.cartService.CollectionCheckout(Sale).subscribe(res => {
      })
       this.makePayment()
    }
     this.cartService.removeAllCart();
     this.snack.open('Order Placed! Shop Again!', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000
    });
    this.router.navigateByUrl('products')
  }

  // OpenDeliveryModal(){
  //   const AddressformOptions: AbstractControlOptions = {};
  //   this.addressform = this.formBuilder.group({
  //   AddressLine1 : new FormControl(this.addy.AddressLine1, [Validators.required]),
  //   addressline2 : new FormControl(this.addy.AddressLine2, [Validators.required]),
  //   addressline3 : new FormControl(this.addy.AddressLine1),
  //   cityDescription : new FormControl(this.addy.AddressLine1, [Validators.required]),
  //   provinceDescription : new FormControl(this.addy.provinceDescription, [Validators.required]),
  //   addressPostalCode : new FormControl(this.addy.AddressPostalCode, [Validators.required,Validators.maxLength(4)])
  // }, AddressformOptions);
  // }

  DeliveryCheckout(){

    this.cartService.GetAddressByCustID(this.Customer.customerId). subscribe(res => {
      console.log(res)
      // this.addyID = res.addressId
      // console.log(this.addyID)
  
    const Sale = {
      customerId : this.Customer.customerId,
      paymentAmount : this.grandTotal,
      addressid: res.addressId,
      saleLists: this.products
    }
    this.cartService.Checkout(Sale)
    .subscribe(data => {
      console.log(data)
    })
    })
    this.cartService.removeAllCart();
    this.snack.open('Order Placed! Shop Again!', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000
    });
    this.router.navigateByUrl('products')
  }
  submitAddressForm() {

      const address: Address = this.addressform.value;
      address.customerId = this.Customer.customerId;
      
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
      email: this.Customer.customerEmailAddress,
      amount: this.grandTotal*100
    }
    this.cartService.paymentInit(data)
    .subscribe(res=>{
      console.log(res)
      window.open(res.data.authorization_url)
    })
  }

}


