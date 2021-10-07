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
  provinceDescription: string;
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
    
    var ids = localStorage.getItem('user')
    const obj = JSON.parse(ids)
   this.userid = obj.userId
   this.customerService.GetProfile(this.userid).subscribe(res => {
    this.Customer = res})
  
//this.cartService.Checkout() {
  // const componentForm = [
  //   'location',
  //   'locality',
  //   'administrative_area_level_1',
  //   'country',
  //   'postal_code',
  // ];
  // const map = new google.maps.Map(document.getElementById("map"), {
  //   zoom: 11,
  //   center: { lat: 37.4221, lng: -122.0841 },
  //   mapTypeControl: false,
  //   fullscreenControl: true,
  //   zoomControl: true,
  //   streetViewControl: true
  // });
  // const marker = new google.maps.Marker({map: map, draggable: false});
  // const autocompleteInput = document.getElementById('location') as HTMLInputElement;
  // const autocomplete = new google.maps.places.Autocomplete(autocompleteInput);
  // autocomplete.addListener('place_changed', function () {
  //   marker.setVisible(false);
  //   const place = autocomplete.getPlace();
  //   if (!place.geometry) {
  //     // User entered the name of a Place that was not suggested and
  //     // pressed the Enter key, or the Place Details request failed.
  //     window.alert('No details available for input: \'' + place.name + '\'');
  //     return;
  //   }
  //   renderAddress(place);
  //   fillInAddress(place);
  // });

  // function fillInAddress(place) {  // optional parameter
  //   const addressNameFormat = {
  //     'street_number': 'short_name',
  //     'route': 'long_name',
  //     'locality': 'long_name',
  //     'administrative_area_level_1': 'short_name',
  //     'country': 'long_name',
  //     'postal_code': 'short_name',
  //   };
  //   const getAddressComp = function (type) {
  //     for (const component of place.address_components) {
  //       if (component.types[0] === type) {
  //         return component[addressNameFormat[type]];
  //       }
  //     }
  //     return '';
  //   };
  //   (<HTMLInputElement>document.getElementById('location')).value = getAddressComp('street_number') + ' '
  //             + getAddressComp('route');
  //   for (const component of componentForm) {
  //     // Location field is handled separately above as it has different logic.
  //     if (component !== 'location') {
  //       (<HTMLInputElement>document.getElementById(component)).value = getAddressComp(component);
  //     }
  //   }
  // }

  // function renderAddress(place) {
  //   map.setCenter(place.geometry.location);
  //   marker.setPosition(place.geometry.location);
  //   marker.setVisible(true);
  // }
}



//OUTSIDE ngOnInit

reloadCurrentPage(){
  this.router.navigate([this.router.url]);
  this.cartService.getTotalPrice();
  console.log(this.products)
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


  // openGoogelMapsModal() {
  //   const modalRef = this.modalService.open(GoogleMapsComponent,
  //     {
  //       scrollable: true,
  //       // windowClass: 'myCustomModalClass',
  //       // keyboard: false,
  //       // backdrop: 'static'
  //     });
  //   let data = {
  //     prop1: 'Some Data',
  //     prop2: 'From Parent Component',
  //     prop3: 'This Can be anything'
  //   }

  //   modalRef.componentInstance.fromParent = data;
  //   modalRef.result.then((result) => {
  //     this.coordinates = result;
  //   }, (reason) => {
  //   });
  // }

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
  }
  submitAddressForm() {

      const address: Address = this.addressform.value;
      address.customerId = this.Customer.customerId;
      
      console.log(address)
      this.cartService.AddCustomerAddress(address).subscribe(res => {
       
        

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