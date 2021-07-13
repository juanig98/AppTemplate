import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestService {

  constructor(public auth: AuthService, public router: Router) { }

  canActivate(): any {
    return this.auth.isLogged().pipe(
      map((response) => {
        if (response) {
          this.router.navigate(['/home']);
          return false;
        } else {
          return true;
        }
      }), catchError((err: Response) => {
        return throwError(err.statusText);
      }));
  }
}
