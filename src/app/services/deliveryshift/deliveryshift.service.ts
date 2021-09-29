import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { last, map } from 'rxjs/operators';
import { Deliveryshift, OnlineSales } from 'src/app/interfaces';

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

  GetDeliveryShift(): Observable<Deliveryshift[]> {
    return this.http.get<Deliveryshift[]>(`${this.server}Deliveryshift/GetDeliveryShift`).pipe(map(res => res));
  }
  GetDeliveryShiftWSale(): Observable<Deliveryshift[]> {
    return this.http.get<Deliveryshift[]>(`${this.server}Deliveryshift/GetDeliveryShiftWSale`).pipe(map(res => res));
  }
  
  GetDeliveryShiftDelivery(): Observable<Deliveryshift[]> {
    return this.http.get<Deliveryshift[]>(`${this.server}Deliveryshift/GetDeliveryShiftDelivery`).pipe(map(res => res));
  }
  
  // Should it be get by employeeShiftId?
  getDeliveryShiftByID(employeeShiftId): Observable<Deliveryshift> {
    return this.http.get<Deliveryshift>(`${this.server}Deliveryshift/GetDeliveryShiftByID/${employeeShiftId}`).pipe(map(res => res));
  }
  GetDeliveryShiftByEmpShiftID(employeeShiftId): Observable<Deliveryshift> {
    return this.http.get<Deliveryshift>(`${this.server}Deliveryshift/GetDeliveryShiftByEmpShiftID/${employeeShiftId}`).pipe(map(res => res));
  }
  
  CreateDeliveryShift(Deliveryshift: Deliveryshift): Observable<Deliveryshift[]> {
    return this.http.post<Deliveryshift[]>(`${this.server}Deliveryshift/AddDate`, Deliveryshift, this.httpOptions);
  }

  AssignDeliveryShifts(Deliveryshift: Deliveryshift): Observable<Deliveryshift[]> {
    return this.http.post<Deliveryshift[]>(`${this.server}Deliveryshift/AssignDeliveryShift`, Deliveryshift, this.httpOptions);
  }

  UpdateDeliveryShift(Deliveryshift: Deliveryshift): Observable<Deliveryshift[]> {
    return this.http.put<Deliveryshift[]>(`${this.server}Deliveryshift/UpdateDeliveryShift`, Deliveryshift, this.httpOptions);
  }

  DeleteDeliveryShift(Deliveryshift: Deliveryshift): Observable<Deliveryshift[]> {
    return this.http.post<Deliveryshift[]>(`${this.server}Deliveryshift/DeleteDeliveryShift`, Deliveryshift, this.httpOptions);
  }

  // DeleteDeliveryShift(deliveryShiftId): Observable<Deliveryshift> {
  //   return this.http.delete<Deliveryshift>(`${this.server}Deliveryshift/DeleteDeliveryShift/${deliveryShiftId}`).pipe(map(res => res));
  // }

  AssignDeliveryShift(Deliveryshift: Deliveryshift): Observable<Deliveryshift[]> {
    return this.http.post<Deliveryshift[]>(`${this.server}Deliveryshift/AssignDeliveryShift`, Deliveryshift, this.httpOptions);
  }

  GetUnscheduledDeliveries():  Observable<Deliveryshift[]>  {
    return this.http.get<Deliveryshift[]>(`${this.server}Delivery/GetUnassignedDeliveries`).pipe(map(res => res));
  }

  GetAssigned(employeeShiftId): Observable<Deliveryshift> {
    return this.http.get<Deliveryshift>(`${this.server}Deliveryshift/GetAssigned/${employeeShiftId}`).pipe(map(res => res));
  }

  AssignLocalDelivery(OnlineSales: OnlineSales): Observable<OnlineSales[]> {
    return this.http.put<OnlineSales[]>(`${this.server}Delivery/AssignLocalDelivery`, OnlineSales, this.httpOptions);
  }

  AssignDelivery(Deliveryshift: Deliveryshift): Observable<Deliveryshift[]> {
    return this.http.put<Deliveryshift[]>(`${this.server}Delivery/AssignDelivery`, Deliveryshift, this.httpOptions);
  }

  GetSaleByID(saleID):  Observable<OnlineSales>  {
    return this.http.get<OnlineSales>(`${this.server}Sale/GetSaleByID/${saleID}`).pipe(map(res => res));
  }
}

//GetDeliveryShiftByID
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
