import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { throwError } from 'rxjs';
import { AuthService } from './auth.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): any {
    return this.auth.isLogged().pipe(
      map((response) => {
        if (response) {
          return true
        } else {
          this.router.navigate(['login']);
          return false;
        }
      }), catchError((err: Response) => {
        this.router.navigate(['login']);
        return throwError(err.statusText);
      }));
  }

}
