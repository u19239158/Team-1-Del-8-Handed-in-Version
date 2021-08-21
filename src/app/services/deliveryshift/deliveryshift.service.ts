import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Deliveryshift } from 'src/app/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DeliveryshiftService {
  server = "https://localhost:44393/api/";

  httpOptions = {
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
};


  constructor(private http: HttpClient) { }

  GetDeliveryShift():  Observable<Deliveryshift[]>  {
    return this.http.get<Deliveryshift[]>(`${this.server}Deliveryshift/GetDeliveryShift`).pipe(map(res => res));
  }

  getDeliveryShiftByID(shiftId):  Observable<Deliveryshift>  {
    return this.http.get<Deliveryshift>(`${this.server}Deliveryshift/GetDeliveryShiftByID/${shiftId}`).pipe(map(res => res));
  }

  CreateDeliveryShift(Deliveryshift:Deliveryshift):  Observable<Deliveryshift[]>  {
    return this.http.post<Deliveryshift[]>(`${this.server}Deliveryshift/AddDate`, Deliveryshift,this.httpOptions);
  }

  AssignDeliveryShifts(Deliveryshift:Deliveryshift):  Observable<Deliveryshift[]>  {
    return this.http.post<Deliveryshift[]>(`${this.server}Deliveryshift/AssignDeliveryShift`, Deliveryshift,this.httpOptions);
  }

  UpdateDeliveryShift(Deliveryshift:Deliveryshift):  Observable<Deliveryshift[]>  {
    return this.http.put<Deliveryshift[]>(`${this.server}Deliveryshift/UpdateDeliveryShift`, Deliveryshift,this.httpOptions);
  }

    DeleteDeliveryShift(deliveryShiftId):  Observable<Deliveryshift>  {
    return this.http.delete<Deliveryshift>(`${this.server}Deliveryshift/DeleteDeliveryShift/${deliveryShiftId}`).pipe(map(res => res));
  }

  AssignDeliveryShift(Deliveryshift:Deliveryshift):  Observable<Deliveryshift[]>  {
    return this.http.post<Deliveryshift[]>(`${this.server}Deliveryshift/AssignDeliveryShift`, Deliveryshift,this.httpOptions);
  }

}

//   getAll(): Deliveryshift[] {
//     const deliveryshifts = JSON.parse(localStorage.getItem(this.KEY));

//     if(!deliveryshifts) {
//       const initialDeliveryshift: Deliveryshift = {
//         id: 1,
//         startTime: '08:00',
//         endTime: '09:00',
//         date: '2006/05/26',
//       };
//       this.addDeliveryshift(initialDeliveryshift);
//       this.getAll();
//     }

//     return deliveryshifts;
//   }

//   getDeliveryshiftById(id: number): Deliveryshift {
//     const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));
//     return deliveryshifts.find(x => x.id === id);
//   }

//   addDeliveryshift(newDeliveryshift: Deliveryshift): void {
//     const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));

//     if (!deliveryshifts) {
//       localStorage.setItem(this.KEY, JSON.stringify([newDeliveryshift]));
//       return;
//     }

//     let lastId = Math.max(...deliveryshifts.map(x => x.id));
//     newDeliveryshift.id = lastId++;
//     localStorage.setItem(this.KEY, JSON.stringify([...deliveryshifts, newDeliveryshift]));
//   }

//   updateDeliveryshift(updated: Deliveryshift): void {
//     const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));
//     const index = deliveryshifts.findIndex(x => x.id == updated.id);

//     if(index > -1) {
//       deliveryshifts.splice(index, 1);
//       deliveryshifts.push(updated);
//       localStorage.setItem(this.KEY, JSON.stringify([...deliveryshifts]));
//     }
//   }

//   deleteDeliveryshift(toDelete: Deliveryshift): void {
//     const deliveryshifts: Deliveryshift[] = JSON.parse(localStorage.getItem(this.KEY));
//     const index = deliveryshifts.findIndex(x => x.id == toDelete.id);

//     if(index > -1) {
//       deliveryshifts.splice(index, 1);
//       localStorage.setItem(this.KEY, JSON.stringify([...deliveryshifts]));
//     }
//   }
// }
