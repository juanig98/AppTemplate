import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { GuestService } from './services/auth/guest.service';
import { LogoutComponent } from './views/components/common/logout/logout.component';
import { ClientsComponent } from './views/pages/clients/clients.component';
import { HomeComponent } from './views/pages/home/home.component';
import { LoginComponent } from './views/pages/login/login.component';
import { UsersComponent } from './views/pages/users/users.component';

const routes: Routes = [
  // No auth
  { path: "login", component: LoginComponent, canActivate: [GuestService] },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // Require Authorization
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService] },
  { path: "usuarios", component: UsersComponent, canActivate: [AuthGuardService] },
  { path: "clientes", component: ClientsComponent, canActivate: [AuthGuardService] },
  { path: "logout", component: LogoutComponent, canActivate: [AuthGuardService] },

  { path: "**", pathMatch: "full", redirectTo: "home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
