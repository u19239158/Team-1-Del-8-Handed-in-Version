import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Courier } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CourierService {

  KEY = 'couriers';
  constructor() { }

  getAll(): Courier[] {
    const couriers = JSON.parse(localStorage.getItem(this.KEY));

    // if(!couriers) {
    //   const initialCourier: Courier = {
    //     id: 1,
    //     name: 'CourierGuy',
    //     type: 'National',
    //     email: 'courierguy',
    //     contactNumber: 08408408,
    //   };
    //   this.addCourier(initialCourier);
    //   this.getAll();
    // }

    return couriers;
  }

  getCourierById(id: number): Courier {
    const couriers: Courier[] = JSON.parse(localStorage.getItem(this.KEY));
    return couriers.find(x => x.id === id);
  }

  addCourier(newCourier: Courier): void {
    const couriers: Courier[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!couriers) {
      localStorage.setItem(this.KEY, JSON.stringify([newCourier]));
      return;
    }

    let lastId = Math.max(...couriers.map(x => x.id));
    newCourier.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...couriers, newCourier]));
  }

  updateCourier(updated: Courier): void {
    const couriers: Courier[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = couriers.findIndex(x => x.id == updated.id);

    if(index > -1) {
      couriers.splice(index, 1);
      couriers.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...couriers]));
    }
  }

  deleteCourier(toDelete: Courier): void {
    const couriers: Courier[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = couriers.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      couriers.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...couriers]));
    }
  }
}
