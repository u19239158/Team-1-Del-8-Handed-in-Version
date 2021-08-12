import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Categorytype } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CategorytypeService {

  KEY = 'categorytypes';
  constructor() { }

  getAll(): Categorytype[] {
    const categorytypes = JSON.parse(localStorage.getItem(this.KEY));

    if(!categorytypes) {
      const initialCategorytype: Categorytype = {
        id: 1,
        categoryType: 'small bolts',
        productCategoryName: 'Product Category 1',
      };
      this.addCategorytype(initialCategorytype);
      this.getAll();
    }

    return categorytypes;
  }

  getCategorytypeById(id: number): Categorytype {
    const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));
    return categorytypes.find(x => x.id === id);
  }

  addCategorytype(newCategorytype: Categorytype): void {
    const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!categorytypes) {
      localStorage.setItem(this.KEY, JSON.stringify([newCategorytype]));
      return;
    }

    let lastId = Math.max(...categorytypes.map(x => x.id));
    newCategorytype.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...categorytypes, newCategorytype]));
  }

  updateCategorytype(updated: Categorytype): void {
    const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = categorytypes.findIndex(x => x.id == updated.id);

    if(index > -1) {
      categorytypes.splice(index, 1);
      categorytypes.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...categorytypes]));
    }
  }

  deleteCategorytype(toDelete: Categorytype): void {
    const categorytypes: Categorytype[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = categorytypes.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      categorytypes.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...categorytypes]));
    }
  }
}
