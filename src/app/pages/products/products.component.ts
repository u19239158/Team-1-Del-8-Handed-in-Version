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
      this.productItems = res;
      console.log(this.productItems);
    })
    //Home page different categories of products
    this.api.getProductCategory()
    .subscribe(res=>{
      this.productCategories=res;
      console.log(res);
    })

  }
  
  //outside ng oninit
  loadbyCat(item){
    this.api.getProductByCategoryTypeID(item.productCategoryId)
    //productCategory
    .subscribe(res=>{
      this.categoryTypes = res;
      console.log(res);
    })
  }

  addtocart(item: any){
    this.cartService.addtoCart(item);
    localStorage.setItem(item.productItemId, JSON.stringify(1));

    var itemList = JSON.parse(localStorage.getItem(item.productItemId)) || [];
    localStorage.setItem(item.productItemId, JSON.stringify(itemList));
    //list of items - identity with id
    // var itemList:any = [];

    // itemList[0] = prompt("New member name?");
    // localStorage.setItem(item.productItemId, JSON.stringify(itemList));
    
    
    // var storedNames = JSON.parse(localStorage.getItem("names"));

    
    // localstorage.names = JSON.stringify(names);
    // var storedNames = JSON.parse(localStorage.names);
    

  // localStorage.setItem('item.productItemId', JSON.stringify(res));

  //JSON.parse(localStorage.getItem('item.productItemId'));

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
