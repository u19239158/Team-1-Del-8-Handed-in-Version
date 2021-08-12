import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Productitem } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductitemService {

  KEY = 'productitems';
  constructor() { }


  getAll(): Productitem[] {
    const productitems = JSON.parse(localStorage.getItem(this.KEY));

    if(!productitems) {
      const initialProductitem: Productitem = {
        id: 1,
        name: 'Bolt',
        description: '6mm',
        cost: 65,
        quantity: 40,
        categorytype: 'Product Category 1',
      };
      this.addProductitem(initialProductitem);
      this.getAll();
    }

    return productitems;
  }

  getProductitemById(id: number): Productitem {
    const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));
    return productitems.find(x => x.id === id);
  }

  addProductitem(newProductitem: Productitem): void {
    const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!productitems) {
      localStorage.setItem(this.KEY, JSON.stringify([newProductitem]));
      return;
    }

    let lastId = Math.max(...productitems.map(x => x.id));
    newProductitem.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...productitems, newProductitem]));
  }

  updateProductitem(updated: Productitem): void {
    const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = productitems.findIndex(x => x.id == updated.id);

    if(index > -1) {
      productitems.splice(index, 1);
      productitems.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...productitems]));
    }
  }

  deleteProductitem(toDelete: Productitem): void {
    const productitems: Productitem[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = productitems.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      productitems.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...productitems]));
    }
  }
}
