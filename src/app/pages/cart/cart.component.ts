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
import { MatSnackBar } from '@angular/material/snack-bar';


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
  public vatTotals !: number;
  public grandTotal !: number;
  public  coordinates: Coordinates;

  constructor(
    private cartService : CartService,
    private snack : MatSnackBar,
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
      this.vatTotals = this.cartService.getVATPrice();
    })
    

  
//this.cartService.Checkout() {
  const componentForm = [
    'location',
    'locality',
    'administrative_area_level_1',
    'country',
    'postal_code',
  ];
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 11,
    center: { lat: 37.4221, lng: -122.0841 },
    mapTypeControl: false,
    fullscreenControl: true,
    zoomControl: true,
    streetViewControl: true
  });
  const marker = new google.maps.Marker({map: map, draggable: false});
  const autocompleteInput = document.getElementById('location') as HTMLInputElement;
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput);
  autocomplete.addListener('place_changed', function () {
    marker.setVisible(false);
    const place = autocomplete.getPlace();
    if (!place.geometry) {
      // User entered the name of a Place that was not suggested and
      // pressed the Enter key, or the Place Details request failed.
      window.alert('No details available for input: \'' + place.name + '\'');
      return;
    }
    renderAddress(place);
    fillInAddress(place);
  });

  function fillInAddress(place) {  // optional parameter
    const addressNameFormat = {
      'street_number': 'short_name',
      'route': 'long_name',
      'locality': 'long_name',
      'administrative_area_level_1': 'short_name',
      'country': 'long_name',
      'postal_code': 'short_name',
    };
    const getAddressComp = function (type) {
      for (const component of place.address_components) {
        if (component.types[0] === type) {
          return component[addressNameFormat[type]];
        }
      }
      return '';
    };
    (<HTMLInputElement>document.getElementById('location')).value = getAddressComp('street_number') + ' '
              + getAddressComp('route');
    for (const component of componentForm) {
      // Location field is handled separately above as it has different logic.
      if (component !== 'location') {
        (<HTMLInputElement>document.getElementById(component)).value = getAddressComp(component);
      }
    }
  }

  function renderAddress(place) {
    map.setCenter(place.geometry.location);
    marker.setPosition(place.geometry.location);
    marker.setVisible(true);
  }
}



//OUTSIDE ngOnInit

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