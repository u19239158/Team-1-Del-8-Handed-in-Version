import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  // server = 'https://localhost:44308/api/';
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     ContentType: 'application/json'
  //   })
  // };

  KEY = 'Images';
  constructor(private http: HttpClient) { }

  getAll(): Image[] {
    const Images = JSON.parse(localStorage.getItem(this.KEY));

    if(!Images) {
      const initialImage: Image = {
        id: 1,
        title: 'Mr',
        firstName: 'Name',
        lastName: 'Surname',
        contactNumber: '0600055555',
        dateOfBirth: '5 May',
        idNumber: '0101010101',
        addressLine1: '3 Far Far',
        addressLine2: 'Awaaaay',
        addressLine3: 'Kude kabi',
        cityTown: 'Weeeeh',
        postalCode: '4678'
      };
      this.addImage(initialImage);
      this.getAll();
    }

    return Images;
  }

  // getImage():  Observable<Images[]>  {
  //   return this.http.get<Images[]>(`${this.server}/Image/GetImages`).pipe(map(res => res));
  // }

  getImageById(id: number): Image {
    const Images: Image[] = JSON.parse(localStorage.getItem(this.KEY));
    return Images.find(x => x.id === id);
  }

  addImage(newImage: Image): void {
    const Images: Image[] = JSON.parse(localStorage.getItem(this.KEY));

    if (!Images) {
      localStorage.setItem(this.KEY, JSON.stringify([newImage]));
      return;
    }

    let lastId = Math.max(...Images.map(x => x.id));
    newImage.id = lastId++;
    localStorage.setItem(this.KEY, JSON.stringify([...Images, newImage]));
  }

  // addImage(newImage: Image) {
  //   return this.http.post<Image>(`${this.server}/Image/Add`, Image, this.httpOptions);
  // }

  updateImage(updated: Image): void {
    const Images: Image[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = Images.findIndex(x => x.id == updated.id);

    if(index > -1) {
      Images.splice(index, 1);
      Images.push(updated);
      localStorage.setItem(this.KEY, JSON.stringify([...Images]));
    }
  }

  // updateImage(updated: Image) {
  //   return this.http.put<Image>(`${this.server}/Image/Update`, Image, this.httpOptions);
  // }
  deleteImage(toDelete: Image): void {
    const Images: Image[] = JSON.parse(localStorage.getItem(this.KEY));
    const index = Images.findIndex(x => x.id == toDelete.id);

    if(index > -1) {
      Images.splice(index, 1);
      localStorage.setItem(this.KEY, JSON.stringify([...Images]));
    }
  }

  // deleteImage(toDelete: Image) {
  //   return this.http.delete<Image>(`${this.server}/Image/Add`, Image, this.httpOptions);
  // }
}
