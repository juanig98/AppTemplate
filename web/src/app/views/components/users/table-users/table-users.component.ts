import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { devConsoleLog } from 'src/app/config/helpers';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/users/user.service';
import { DialogUserComponent } from '../dialog-user/dialog-user.component';

@Component({
  selector: 'app-table-users',
  templateUrl: './table-users.component.html',
  styleUrls: ['./table-users.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class TableUsersComponent implements OnInit {
  tableName = 'table-users';
  users!: User[];
  userSelected!: User;

  first = 0;
  rows = 5;

  @Output() eventUserSelected = new EventEmitter<User>();

  constructor(
    private userService: UserService,
    private confimationService: ConfirmationService,
    public dialogService: DialogService
  ) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      response => this.users = response
    )
  }

  editUser(user: User) {
    this.dialogService.open(DialogUserComponent, {
      header: "Editar usuario",
      width: "70%",
      data: user,
    })

  }
  disableUser(user: User) {
    this.confimationService.confirm({
      header: "¿Está seguro que desea deshabilitar este usuario?",
      accept: () => {
        this.userService.disableUser(user).subscribe(
          response => { devConsoleLog(response) },
          error => { devConsoleLog(error) }
        )
      }
    });

  }
  onRowSelect(): void { this.eventUserSelected.emit(this.userSelected) }

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
