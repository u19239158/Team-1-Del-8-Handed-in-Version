import { Component, Injectable, OnInit, ViewEncapsulation  } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of } from 'rxjs/internal/observable/of';
import { ApiService, CategoryType} from 'src/app/services/service/api.service';
import { CartService } from 'src/app/services/service/cart.service';

@Injectable()

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit {

  public productList : any = [];
  public categoryTypes : any = [];
  public productCategories : any = [];

  public productItems : any = [];
  public products : any = [];
  modalItems: any = [];

  constructor(private api : ApiService, private cartService : CartService, private snack : MatSnackBar) { }

  ngOnInit(): void {


    //Home page different categories of products
    this.api.getProductCategory()
    .subscribe(res=>{
      this.productCategories=res;
      console.log(this.productCategories);

    })

    
    //product page content
    this.api.getCategoryType()
    .subscribe(res=>{
      this.categoryTypes=res;
      console.log(this.categoryTypes);

    })

    //modal product type dropdown
    this.api.getProductItem()
    .subscribe(res=>{
      this.productItems = res;
      console.log(this.productItems);
    })
    
    // this.cartService.getModalProduct()
    // .subscribe(res=>{
    //   this.products = res;
    // })
  }
  
  //outside ng oninit
  addtocart(item: any){
    this.cartService.addtoCart(item);

    this.snack.open('Item added to cart! ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000
    });
  }

  loadbyCat(item){
    this.api.getProductByCategoryTypeID(item.productCategoryId)
    //productCategory
    .subscribe(res=>{
      this.categoryTypes = res;
      console.log(res);
    })
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
