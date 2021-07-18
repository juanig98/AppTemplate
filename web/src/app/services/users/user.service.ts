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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${route_api}/users/${id}`, this.authService.getHttpHeaders())
  }

  createUser(user: UserForm): Observable<User> {
    return this.http.post<User>(`${route_api}/users/`, user, this.authService.getHttpHeaders());
  }

  editUser(id: number, user: UserForm): Observable<User> {
    return this.http.put<User>(`${route_api}/users/${id}`, user, this.authService.getHttpHeaders());
  }

  disableUser(user: User): Observable<any> {
    return this.http.delete<any>(`${route_api}/users/${user.id}`, this.authService.getHttpHeaders());
  }
}

interface UserForm {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
}
