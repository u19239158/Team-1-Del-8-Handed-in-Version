//import { InterceptorServiceService } from './../services/interceptor-service.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { InterceptorServiceService } from '../services/interceptor-service.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private InterceptorServiceService : InterceptorServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.InterceptorServiceService.getauthorisationtoken();
    if (token)
    {
      const newrequest = request.clone({headers : request.headers.set('Authorization',token)});
      return next.handle(newrequest);
    }
    return next.handle(request);
  }
}
