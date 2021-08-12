import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Productcategory } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductcategoryService {

  KEY = 'productcategorys';
  constructor() { }

  getAll(): Productcategory[] {
    const productcategorys = JSON.parse(localStorage.getItem(this.KEY));

    if(!productcategorys) {
      const initialProductcategory: Productcategory = {
        id: 1,
        productCategoryName: 'Bolts',
      };
      this.addProductcategory(initialProductcategory);
      this.getAll();
    }

    return productcategorys;
  }

  getProductcategoryById(id: number): Productcategory {
    const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));
    return productcategorys.find(x => x.id === id);
  }

  addProductcategory(newProductcategory: Productcategory): void {
    const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!productcategorys) {
      localStorage.setItem(this.KEY, JSON.stringify([newProductcategory]));
      return;
    }

    let lastId = Math.max(...productcategorys.map(x => x.id));
    newProductcategory.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...productcategorys, newProductcategory]));
  }

  updateProductcategory(updated: Productcategory): void {
    const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = productcategorys.findIndex(x => x.id == updated.id);

    if(index > -1) {
      productcategorys.splice(index, 1);
      productcategorys.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...productcategorys]));
    }
  }

  deleteProductcategory(toDelete: Productcategory): void {
    const productcategorys: Productcategory[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = productcategorys.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      productcategorys.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...productcategorys]));
    }
  }
}
