import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authservice: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted! ', req);
        // const copiedRequest = req.clone({headers: req.headers.append('', '')});
        const copiedRequest = req.clone({params: req.params.set('auth', this.authservice.getToken())});
        return next.handle(copiedRequest);
    }
}