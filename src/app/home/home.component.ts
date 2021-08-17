import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { of } from 'rxjs/internal/observable/of';
import { ApiService} from 'src/app/services/service/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  public categoryType : any ;
  public products : any ;
  constructor(private api : ApiService) { }

  ngOnInit() {
    this.api.getCategoryType()
    .subscribe(res=>{
      this.categoryType=res;

      this.categoryType.forEach((a:any) => {
        Object.assign(a,{quantity:1,total:a.price});
      });
    })
  }

}
