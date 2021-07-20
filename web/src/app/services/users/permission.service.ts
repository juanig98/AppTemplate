import { devConsoleLog } from 'src/app/config/helpers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { route_api } from 'src/app/config/routes';
import { Permission } from 'src/app/models/Permission';
import { User } from 'src/app/models/User';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPermissions(user: User): Observable<DualPermission> {
    return this.http.get<DualPermission>(`${route_api}/permissions-user/${user.id}`, this.authService.getHttpHeaders())
  }

  updatePermissions(user: User, granted: Permission[]): Observable<DualPermission> {
    return this.http.post<DualPermission>(`${route_api}/permissions-user/`, { user: user, granted: granted }, this.authService.getHttpHeaders());
  }
}

interface DualPermission {
  available: Permission[];
  granted: Permission[];
}
