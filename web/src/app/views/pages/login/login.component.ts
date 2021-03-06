import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TitleService } from 'src/app/services/title/title.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl((environment.production) ? '' : 'juani', [Validators.required]),
    password: new FormControl((environment.production) ? '' : 'juanito123', [Validators.required])
  })

  isLoadingRegistrarse = false;
  disableBtnSubmit = false;

  constructor(
    private titleService: TitleService,
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
  ) {
    this.titleService.setTitle("Acceso");
  }

  ngOnInit(): void {

  }
  /**
   * Inicia sesión con las credenciales ingresadas por el usuario
   *
   */
  public login() {
    this.isLoadingRegistrarse = true;
    const MISSING_FIELD = 1001;
    try {
      if (!this.loginForm.valid) throw MISSING_FIELD

      this.disableBtnSubmit = true; // Deshabilito el botón de submit

      this.authService.login(this.loginForm.value).subscribe(
        response => {
          this.authService.setToken(response.token);
          this.router.navigate(['home']);
          this.isLoadingRegistrarse = false;
        },
        error => {
          this.disableBtnSubmit = false;
          if (error.status == 401) {
            console.clear()
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrecto' });
          }
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrecto' });

          this.isLoadingRegistrarse = false;
        },
      );
    } catch (error) {
      if (error == MISSING_FIELD) this.messageService.add({ severity: 'error', summary: 'Debes completar todos los campos' })
    }
  }

}
