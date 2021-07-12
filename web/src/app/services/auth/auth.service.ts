import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { iif, Observable } from 'rxjs';
import { current_route, route_api } from 'src/app/config/routes';
import { User } from 'src/app/models/User';
import { Token } from 'src/app/models/Token';


const httpOptions = {
  headers: new HttpHeaders({
    Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
  })
};

const httpHeaders = function (token: string) {
  return {
    headers: new HttpHeaders({
      Authorization: `${token}`
    })
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user!: User;

  constructor(private http: HttpClient) { }

  /** Seteo de token en local storage */
  public setToken(token: string) { localStorage.setItem('token', token) }

  /** Obtención del token desde el local storage */
  public getToken(): any { return (localStorage.getItem('token')) ? localStorage.getItem('token') : "" }

  /** Seteo de token en Http headers -> utilizado cuando realizo una petición al servidor*/
  public getHttpHeaders() { return httpHeaders(this.getToken()) }

  /** Obtiene el User registrado */
  public getUser(): User { return this.user; }

  /** Define el User */
  private setUser(data: any): User {
    return new User(
      data.id,
      data.username,
      data.email,
      data.first_name,
      data.last_name,
      new Date())
  }

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
    localStorage.removeItem('token');
    // const token = this.getToken();

    // this.http.post<any>(`${route_api}/logout/`, { token: token }, httpOptions).subscribe(
    //   response => { localStorage.removeItem('token'); this.router.navigate(['login']) },
    //   error => alert(error)
    // );
  }

  /**
   * Consulta si el User está logueado en sistema
   *
   * @returns boolean
   */
  public isLogged() {
    const route = window.location.pathname;

    try {

      const token = this.getToken();

      // Si no hay token el en localstorage falla (retorna falso)
      if (!token) throw new Error("Unauthorized");

      // Si existe un User definido en un periodo menor a 5 minutos (periodo de gracia) se da como válido
      if (this.getUser()) {
        let currentTime = new Date();
        // devConsoleLog("DefineAt -> " + this.getUser().definedAt.getTime(), "Current -> " + currentTime.getTime(), "Ten minutes ago -> " + (currentTime.getTime() - 100))
        if (this.getUser().definedAt.getTime() > currentTime.getTime() - 300000) return true
      };

      // Si el User está fuera del periodo de gracia se valida con el token
      return this.http.post<User>(`${route_api}/validate/`, { token: token }, httpHeaders(token)).subscribe(
        response => { this.user = this.setUser(response); return true; }, // Si es válido
        error => { return false } // Si no es válido
      );
    } catch { return false }
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
