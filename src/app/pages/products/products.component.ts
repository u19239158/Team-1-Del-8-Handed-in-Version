import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ApiService} from 'src/app/services/service/api.service';
import { CartService } from 'src/app/services/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  public productList : any ;
  public products : any ;
  modalItems: any = [];
  constructor(private api : ApiService, private cartService : CartService) { }

  ngOnInit(): void {

    this.api.getCategoryType()
    .subscribe(res=>{
      this.productList=res;

      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
    })

    this.api.getProduct()
    .subscribe(res=>{
      this.productList = res;

      this.productList.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});      
      });
    })
    
    this.cartService.getModalProduct()
    .subscribe(res=>{
      this.products = res;
    })
  }
  
  addtocart(item: any){
    this.cartService.addtoCart(item);
  }

  openmodal(item: any){
    document.querySelector('.modal').classList.add('is-active')
    this.cartService.showItemModal(item);
  }

  closemodal(item:any){
    this.modalItems = [];
      document.querySelector('.modal').classList.remove('is-active')
      this.cartService.closeItemModal(item);
    }
    
  Itemdropdown(){
    document.querySelector('.dropdown').classList.add('is-active')
  }

  ItemdropdownClose(){
    document.querySelector('.dropdown').classList.remove('is-active')
  }
}
