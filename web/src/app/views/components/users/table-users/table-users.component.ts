import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { devConsoleLog } from 'src/app/config/helpers';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/users/user.service';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  providers: [DialogService]
})
export class TableUsersComponent implements OnInit {
  tableName = 'table-users';
  users!: User[];
  userSelected!: User;

  first = 0;
  rows = 5;

  @Output() eventUserSelected = new EventEmitter<User>();

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    private confimationService: ConfirmationService,
    public dialogService: DialogService
  ) { }

  ngOnInit() { this.listUsers(); }

  listUsers(): void { this.userService.getUsers().subscribe(response => this.users = response) }

  addUser(): void {
    const dialog = this.dialogService.open(DialogUserComponent, {
      header: 'Agregar usuario',
      width: '70%'
    });
    dialog.onClose.subscribe((response) => {
      if (response) {
        this.messageService.add({ severity: "success", summary: "Listo!", detail: "Usuario creado exitosamente" })

      }
    });
  }

  editUser(user: User): void {
    const dialog = this.dialogService.open(DialogUserComponent, {
      header: "Editar usuario",
      width: "70%",
      data: user,
    })

    dialog.onClose.subscribe((response) => {
      if (response) {
        this.messageService.add({ severity: "success", summary: "Listo!", detail: "Usuario editado exitosamente" })
        this.listUsers();
      }
    })
  }

  disableUser(user: User): void {
    this.confimationService.confirm({
      header: "Confirmación",
      message: "¿Está seguro que desea deshabilitar este usuario?  ",
      acceptLabel: "Si, deshabilitar",
      accept: () => {
        this.userService.disableUser(user).subscribe(
          response => {
            this.messageService.add({ severity: "success", summary: "Listo!", detail: "Usuario deshabilitado" })
            this.listUsers();
          },
          error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error!", detail: error }) }
        )
      }
    });
  }

  enableUser(user: User): void {
    this.confimationService.confirm({
      header: "Confirmación",
      message: "¿Está seguro que desea habilitar este usuario?  ",
      acceptLabel: "Si, habilitar",
      accept: () => {
        this.userService.enableUser(user).subscribe(
          response => {
            this.messageService.add({ severity: "success", summary: "Listo!", detail: "Usuario habilitado" })
            this.listUsers();
          },
          error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error!", detail: error }) }
        )
      }
    });
  }

  editPermissions(user: User): void { this.eventUserSelected.emit(user) }


  onRowSelect(): void { } //this.eventUserSelected.emit(this.userSelected)}

  // Table functions
  next() { this.first = this.first + this.rows; }
  prev() { this.first = this.first - this.rows; }
  reset() { this.first = 0; }
  isLastPage(): boolean { return this.users ? this.first === (this.users.length - this.rows) : true; }
  isFirstPage(): boolean { return this.users ? this.first === 0 : true; }
  toogleTable() {
    document.getElementById(this.tableName)?.classList.toggle('updown')
    setTimeout(() => { document.getElementById(this.tableName)?.classList.toggle('hidden') }, 450)
  }
}
