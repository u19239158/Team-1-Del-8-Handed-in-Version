import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ApiService} from 'src/app/services/service/api.service';
import { CartService } from 'src/app/services/service/cart.service';
import { CategoryType } from 'src/app/services/service/api.service';
@Injectable()

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public productList : any ;
  public categoryTypes : any = [];
  public products : any ;

  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit() {
    this.api.getCategoryType()
    .subscribe(res=>{
      this.categoryTypes=res;
      console.log(this.categoryTypes);
    })    
    
    //Home page different categories of products
    this.api.getProductCategory()
    .subscribe(res=>{
      this.categoryTypes=res;
      console.log(this.categoryTypes);

    })

    this.cartService.getModalProduct()
    .subscribe(res=>{
      this.products = res;
    })
  }

}
