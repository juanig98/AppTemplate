import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable, Subject } from 'rxjs';
import { current_route, route_api } from 'src/app/config/routes';
import { User } from 'src/app/models/User';
import { Token } from 'src/app/models/Token';
import { devConsoleLog } from 'src/app/config/helpers';


const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  })
};

const httpHeaders = function (token: string) {
  return {
    headers: new HttpHeaders({
      Authorization: `Token ${token}`
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: User;

  constructor(
    private http: HttpClient,
    private cookie: CookieService
  ) { }

  /** Seteo de token en cookies */
  public setToken(token: string) { this.cookie.set('token', token, 1, '/') }

  /** Obtención del token desde el cookies */
  public getToken(): string { return this.cookie.get('token') }

  /** Seteo de token en Http headers -> utilizado cuando realizo una petición al servidor*/
  public getHttpHeaders() { return httpHeaders(this.getToken()) }

  /** Obtiene el User registrado */
  public getUser(): User { return this.user; }

  /**
   * @deprecated
   * Define el User */
  // private setUser(data: any): User {
  //   return new User(data.id, data.username, data.email, data.first_name, data.last_name, data.status, new Date());
  // }

  /**
   * Realiza el logueo en el backend enviando las credenciales que provea el User
   *
   * @param Credentials
   */
  public login(credentials: Credentials): Observable<Token> {
    return this.http.post<Token>(`${route_api}/login/`, credentials, httpOptions);
  }

  /**
   * Realiza el cierre de cesión
   *
   */
  public logout() {
    this.cookie.delete('token');
  }

  /**
   * Consulta si el User está logueado en sistema
   *
   * @returns boolean
   */
  public isLogged(): Observable<boolean> {
    const subject = new Subject<boolean>();
    try {

      const token = this.getToken();

      // Si no hay token falla (retorna falso)
      if (!token) subject.next(false);

      // Si existe un User definido en un periodo menor a 5 minutos (periodo de gracia) se da como válido
      // if (this.getUser()) {
      //   let currentTime = new Date();
      //   if (this.getUser().date_joined.getTime() > currentTime.getTime() - 300000) subject.next(true)
      // };

      // Si el User está fuera del periodo de gracia se valida con el token
      this.http.post<User>(`${route_api}/validate/`, { token: token }, httpHeaders(token)).subscribe(
        response => { this.user = response; devConsoleLog("ACA"); subject.next(true); }, // Si es válido
        error => { subject.next(false) } // Si no es válido
      );
    } catch {
      subject.next(false)
    } finally {
      return subject.asObservable()
    }
  }

}

class Credentials {
  username: string;
  password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }
}
