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

    //all product items for main page
    this.api.getAllItems()
    .subscribe(res=>{      
      this.productItems= res.withoutspecial.map( (data, number) => ({...data, num:1}) );      
      //console.log(this.productItems);
    })
    
    //Home page different categories of products (TABS)
    this.api.getProductCategory()
    .subscribe(res=>{
      this.productCategories=res;
      //console.log(res);
    })
  }
  
  //outside ng oninit
  loadbyCat(item){
    this.api.getProductByCategoryTypeID(item.productCategoryId)
    .subscribe(res=>{
      this.categoryTypes= res.withoutspecial.map( (data, number) => ({...data, num:1}) );      
      // console.log(this.categoryTypes);
      
      // console.log(res);
    })
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
    localStorage.setItem(item.productItemId, JSON.stringify(1));

    var itemList = JSON.parse(localStorage.getItem(item.productItemId)) || [];
    localStorage.setItem(item.productItemId, JSON.stringify(itemList));
    
    this.snack.open('Item added to cart! ', 'OK', 
    {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000
    });
  }

    
  Itemdropdown(){
    document.querySelector('.dropdown').classList.add('is-active')
  }

}
