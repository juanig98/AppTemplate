import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { HomeComponent } from './views/pages/home/home.component';
import { LoginComponent } from './views/pages/login/login.component';

const routes: Routes = [
  // No auth
  { path: "login", component: LoginComponent },

  // Require Authorization
  { path: "", component: HomeComponent, canActivate: [AuthGuardService], data: { viewNavBar: true, labelNavBar: "Home", icon: "home" } },
  { path: "home", component: HomeComponent, canActivate: [AuthGuardService], data: { viewNavBar: true, labelNavBar: "Home", icon: "home" } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
