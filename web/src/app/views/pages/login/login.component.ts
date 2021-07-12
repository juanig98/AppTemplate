import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl((environment.production) ? '' : 'juani@email', [Validators.required, Validators.email]),
    contrasenia: new FormControl((environment.production) ? '' : 'abc.1234', [Validators.required])
  })

  isLoadingRegistrarse = false;
  disableBtnSubmit = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router,
  ) { }

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
          localStorage.setItem('token', response.token);
          this.router.navigate(['home']);
          this.isLoadingRegistrarse = false;
        },
        error => {
          this.disableBtnSubmit = false;
          if (error.status == 401) {
            console.clear()
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrecto' });
          }
          this.isLoadingRegistrarse = false;
        },
      );
    } catch (error) {
      if (error == MISSING_FIELD) this.messageService.add({ severity: 'error', summary: 'Debes completar todos los campos' })
    }
  }

}
