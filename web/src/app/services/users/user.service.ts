import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/User';
import { route_api } from 'src/app/config/routes';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) { }


  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${route_api}/users/`, this.authService.getHttpHeaders())
  }
}
