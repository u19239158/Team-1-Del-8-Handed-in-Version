import { Injectable } from '@angular/core';
import { last } from 'rxjs/operators';
import { Deliveryshift } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeliveryshiftService {

  KEY = 'deliveryshifts';
  constructor() { }

  /**
   *
   * @returns an array of type User
   * This function reads all of the users from localStorage, if nothing is found it'll add an initial user to the
   * localStorage key and recursively call itself again to read the users again.
   */
  getAll(): Deliveryshift[] {
    const deliveryshifts = JSON.parse(localStorage.getItem(this.KEY));

    if(!deliveryshifts) {
      const initialDeliveryshift: Deliveryshift = {
        id: 1,
        startTime: '08:00',
        endTime: '09:00',
        date: '2006/05/26',
      };
      this.addDeliveryshift(initialDeliveryshift);
      this.getAll();
    }

    return deliveryshifts;
  }

  getDeliveryshiftById(id: number): Deliveryshift {
    const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));
    return deliveryshifts.find(x => x.id === id);
  }

  addDeliveryshift(newDeliveryshift: Deliveryshift): void {
    const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!deliveryshifts) {
      localStorage.setItem(this.KEY, JSON.stringify([newDeliveryshift]));
      return;
    }

    let lastId = Math.max(...deliveryshifts.map(x => x.id));
    newDeliveryshift.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...deliveryshifts, newDeliveryshift]));
  }

  updateDeliveryshift(updated: Deliveryshift): void {
    const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = deliveryshifts.findIndex(x => x.id == updated.id);

    if(index > -1) {
      deliveryshifts.splice(index, 1);
      deliveryshifts.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...deliveryshifts]));
    }
  }

  deleteDeliveryshift(toDelete: Deliveryshift): void {
    const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = deliveryshifts.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      deliveryshifts.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...deliveryshifts]));
    }
  }
}
