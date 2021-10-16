import { AutofillMonitor } from '@angular/cdk/text-field';
import { Component, OnInit } from '@angular/core';
import { CartService, OnlineSale, Sale, User, } from 'src/app/services/service/cart.service';
import { AbstractControlOptions, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { SafeMethodCall } from '@angular/compiler';
import { Observable } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Customer, CustomerService } from 'src/app/services/customer/customer.service';
import { throwToolbarMixedModesError } from '@angular/material/toolbar';
import { __values } from 'tslib';
// import { setFlagsFromString } from 'v8';
import { TokenType } from '@angular/compiler/src/ml_parser/lexer';


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

export class order {
  num: number;
  productitemid: number;
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  addressform: FormGroup;
  tokeny = localStorage.getItem('token')
  isSubmitted = false;
  public products: order[] = [];
  public transaction: any = [];
  public vatTotals !: number;
  public grandTotal !: number;
  public coordinates: Coordinates;
  public provinceList: any = [];
  public cityList: any = [];
  Address: Address;

  selectedOption: string;
  selectedOption2: string;

  public localPlaces: any = ['Port Shepstone, Margate, Hibberdene, Port Edward, South Broom, Shelley Beach, Umtentweni, Ramsgate'];
  // yesLocal = true;

  Customer: Customer;
  userid: number;
  token: string;
  addy: Address
  addyID: number;

  // auth= localStorage.getItem('user')
  // public authy = JSON.parse(this.auth);
  // public Auth = this.authy.auth

  constructor(
    private router: Router,
    private cartService: CartService,
    private snack: MatSnackBar,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private customerService: CustomerService,
  ) {
    this.coordinates = {} as Coordinates;
  }


  ngOnInit() {
    const AddressformOptions: AbstractControlOptions = {};
    this.addressform = this.formBuilder.group({
      AddressLine1: ['', [Validators.required]],
      addressline2: ['', [Validators.required]],
      cityDescription: ['', [Validators.required]],
      provinceDescription: ['', [Validators.required]],
      addressPostalCode: ['', [Validators.minLength(4), Validators.maxLength(4), Validators.required]],
    }, AddressformOptions);

    //show products in cart
    this.cartService.getProducts()
      .subscribe(res => {
        this.products = res;

        this.grandTotal = this.cartService.getTotalPrice();
        this.vatTotals = this.cartService.getVATPrice();

        console.log(this.products)
      })

    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    this.userid = obj.userId
    this.token = obj.auth

    //THIS IS THE ADDRESS AUTHENTICATION
    localStorage.setItem('token', this.token)
    localStorage.getItem('token')
    console.log(this.token)

    //  const addressAUTH = localStorage.getItem('addressAuth');
    //  console.log(addressAUTH)
    //  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJ1MTkwNzI5MTJAdHVrcy5jby56YSIsImFwaV90b2tlbiI6Im8xWkNzVmtmdnFTS3ZNNHNxd0RRZE90d0FmNVZ3NzFvNDggLVdxSVBxemY2ZVJCVlFHa09WLWVHWGJpZ05FQ2J4UnV3In0sImV4cCI6MTYzNDIyMDAzOX0.JxWReSLlLCpbGSFQeTicFNnkpKF2j6BPkAEgIoxQy1M
    //  let auth= localStorage.getItem('user')
    //  let authy = JSON.parse(auth);
    //  let Auth = authy.auth
    //  console.log(Auth)

    //populateProvince
    this.cartService.Provinces()
      .subscribe(res => {
        this.provinceList = res;
        return this.provinceList;
      })


    this.customerService.GetProfile(this.userid).subscribe(res => {
      this.Customer = res
    })


  }




  //OUTSIDE ngOnInit
  populateCities() {
    this.cartService.Cities(this.selectedOption)
      .subscribe(res => {
        this.cityList = res;
      })
  }

  onBlur() {
    this.populateCities()
  }

  TotalPrice() {
    if (this.selectedOption2 == 'Port Shepstone' || this.selectedOption2 == 'Margate' || this.selectedOption2 == 'Hibberdene' || this.selectedOption2 == 'Port Edward' || this.selectedOption2 == 'South Broom' || this.selectedOption2 == 'Shelley Beach' || this.selectedOption2 == 'Umtentweni' || this.selectedOption2 == 'Ramsgate') {
      //||'Margate'||'Hibberdene'||'Port Edward'||'South Broom'||'Shelley Beach'||'Umtentweni'||'Ramsgate'
      console.log(this.selectedOption2)
      console.log('Local')
      //creat 2min
      let toMinus = 25;
      //this.grandTotal-=toMinus
      //minus 2min
      this.grandTotal += 25;
      //set to R50 ir R100
      console.log(this.grandTotal)
    }
    else {
      console.log(this.selectedOption2)
      console.log('Courier')
      let toMinus = 50;
      //this.grandTotal-=toMinus
      this.grandTotal += 50;
      //console.log(this.grandTotal)
    }
    //document.querySelector('#totalModal').classList.add('is-active')
  }


  reloadCurrentPage() {
    this.router.navigate([this.router.url]);
    this.cartService.getTotalPrice();
    this.grandTotal = this.cartService.getTotalPrice();
    this.vatTotals = this.cartService.getVATPrice();
  }

  //CART METHODS - Remove, clear items
  removeItem(item: any) {
    this.cartService.removeCartItem(item);

    this.snack.open('Item removed from cart', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 2000
      });

  }
  emptycart() {
    this.cartService.removeAllCart();
    this.router.navigate([this.router.url]);

    this.snack.open('Cart emptied', 'OK',
      {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 2000
      });
  }

  userLogin() {
    document.querySelector('#loginModal').classList.add('is-active')
  }

  openmodal() {
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
    if (obj == null) {
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

  close() {
    document.querySelector('.modal').classList.remove('is-active')
  }

  closeDeliveryModal() {
    document.querySelector('#deliveryModal').classList.remove('is-active')
  }

  closeTotalModal() {
    document.querySelector('#totalModal').classList.remove('is-active')
  }

  submitForm(form: NgForm) {
    this.isSubmitted = true;

    if (!form.valid) {
      return false;

    } else if (form.value.method == "delivery") {

      console.log("else if", form.value)

      this.cartService.GetAddressByCustID(this.Customer.customerId).subscribe(res => {
        this.addy = res
        console.log(res)
      })

      document.querySelector('#deliveryModal').classList.add('is-active')
      document.querySelector('.modal').classList.remove('is-active')
      const delivery: Delivery = form.value;
    }
    else {

      console.log("else", form.value)
      document.querySelector('.modal').classList.remove('is-active')
      console.log(this.products)
      const Sale = {
        customerId: this.Customer.customerId,
        paymentAmount: this.grandTotal,
        saleLists: this.products
      }
      console.log(Sale)
      this.cartService.CollectionCheckout(Sale).subscribe(res => {
      })
      this.makePayment()

      this.cartService.removeAllCart();

      //  this.snack.open('Order Placed! Shop Again!', 'OK', 
      // {
      //   verticalPosition: 'top',
      //   horizontalPosition: 'center',
      //   duration: 2000
      // });
      this.router.navigateByUrl('products')
    }


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

  DeliveryCheckout() {
    const address: Address = this.addressform.value;
    address.customerId = this.Customer.customerId;

    console.log(address)
    this.cartService.AddCustomerAddress(address).subscribe(res => {
      console.log(res)
    })

    this.cartService.GetAddressByCustID(this.Customer.customerId).subscribe(res => {
      this.addy = res
    })
    const Sale = {
      customerId: this.Customer.customerId,
      paymentAmount: this.grandTotal,
      saleLists: this.products,
      addressid: this.addy.addressId
    }
    if (this.addressform.valid) {
      this.cartService.Checkout(Sale).subscribe(data => {
        console.log(data)
      })
      this.TotalPrice()
      console.log(this.grandTotal)
      this.makePayment();
      this.cartService.removeAllCart();
      // this.snack.open('Order Placed! Shop Again!', 'OK', 
      // {
      //   verticalPosition: 'top',
      //   horizontalPosition: 'center',
      //   duration: 2000
      // });
      this.router.navigateByUrl('products')
    }
    else {
      this.snack.open('Please Enter Address to Checkout.', 'OK',
        {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
    }
  }

  makePayment() {
    const data = {
      email: this.Customer.customerEmailAddress,
      amount: this.grandTotal * 100
    }
    this.cartService.paymentInit(data)
      .subscribe(res => {
        console.log(res)
        window.open(res.data.authorization_url)
      })
  }

}


