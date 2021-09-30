import { Component, Injectable, OnInit, ViewEncapsulation  } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ApiService, CategoryType} from 'src/app/services/service/api.service';
import { CartService } from 'src/app/services/service/cart.service';

@Injectable()

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.scss']
})

export class PromotionsComponent implements OnInit {

  public categoryPromoTypes : any = [];
  public specials : any = [];
  public promoCategories : any = [];
  public promoproducts : any = [];
  public promoProductItems : any = [];
  public discountprices : any = [];
  modalItems: any = [];
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {

    //Home page different categories of products
    this.api.getProductCategory()
    .subscribe(res=>{
      this.promoCategories=res;
      console.log(this.promoCategories);

    })
    
    //product page content
    this.api.getCategoryType()
    .subscribe(res=>{
      this.categoryPromoTypes=res;
      console.log(this.categoryPromoTypes);

    })


    //getDiscount
    //discount price content
    // this.api.getDiscount()
    // .subscribe(res=>{
    //   this.discountprices=res;
    //   console.log(this.discountprices);
    // })

    this.api.getAllItems()
    .subscribe(res=>{
      this.specials=res.withspecial;
      console.log(this.specials);
    })

    //modal product type dropdown
    this.api.getProductItem()
    .subscribe(res=>{
      this.promoProductItems = res;
      console.log(this.promoProductItems);

    // this.products.forEach((a:any) => {
    //     Object.assign(a,{quantity:1,total:a.price});      
      // });
    })

    
    // this.cartService.getModalProduct()
    // .subscribe(res=>{
    //   this.promoproducts = res;
    // })
  }
  
  //outside ng oninit
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  // openmodal(item: any){
  //   document.querySelector('.modal').classList.add('is-active')
  //   this.cartService.showItemModal(item);
  // }

  // closemodal(item:any){
  //   this.modalItems = [];
  //     document.querySelector('.modal').classList.remove('is-active')
  //     this.cartService.closeItemModal(item);
  //   }
    
  Itemdropdown(){
    document.querySelector('.dropdown').classList.add('is-active')
  }

  // ItemdropdownClose(){
  //   document.querySelector('.dropdown').classList.remove('is-active')
  // }
}
