
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { devConsoleLog } from 'src/app/config/helpers';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
