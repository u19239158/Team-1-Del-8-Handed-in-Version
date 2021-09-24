import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ApiService} from 'src/app/services/service/api.service';
import { CartService } from 'src/app/services/service/cart.service';
import { CategoryType } from 'src/app/services/service/api.service';
import { filter } from 'rxjs/operators';

@Injectable()

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  // public productList : any ;
  public categoryTypes : any = [];
  public productCategories : any = [];
  public products : any ;

  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit() {

    // this.api.getCategoryType()
    // .subscribe(res=>{
    //   this.categoryTypes=res;
    //   console.log(this.categoryTypes);
    // })    
    
    //Home page 7 different categories of products
    this.api.getProductCategory()
    .subscribe(res=>{
      this.productCategories=res;
      console.log(this.productCategories);
      

      const test1= res.map(y => y.productCategoryDescription)
      console.log(test1) // gives 7 undefined values
      //res.forEach((prod) => console.log(prod.ProductCategory_Description))
      //console.log(this.productCategories.ProductCategory_Description)
      //Screws

    })

    // this.cartService.getModalProduct()
    // .subscribe(res=>{
    //   this.products = res;
    // })
  }

  //outside ng oninit
  // loadbyCat(item){
  //   this.api.getProductByCategoryTypeID(item.productCategoryId)
  //   //productCategory
  //   .subscribe(res=>{
  //     this.categoryTypes = res;
  //     console.log(res);
  //   })
  // }
}
