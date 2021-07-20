import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { devConsoleLog } from 'src/app/config/helpers';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/users/user.service';

@Component({
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.scss']
})
export class DialogUserComponent implements OnInit {

  user: User;
  isCreate: boolean = false;
  isUpdate: boolean = false;

  resetPassword: boolean = false;

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    password: new FormControl(''),
    email: new FormControl('', [Validators.email, Validators.required]),
    resetPassword: new FormControl('')
  })

  constructor(
    private messageService: MessageService,
    private userService: UserService,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.user = (this.config.data) ? this.config.data : new User();
  }

  ngOnInit(): void {

    if (this.user.id != 0) {
      this.isUpdate = true;
      this.userForm.get('username')?.setValue(this.user.username);
      this.userForm.get('first_name')?.setValue(this.user.first_name);
      this.userForm.get('last_name')?.setValue(this.user.last_name);
      this.userForm.get('email')?.setValue(this.user.email);
    } else {
      this.isCreate = true;
    }

  }

  submitUserForm() {

    if (this.isCreate) {
      this.userService.createUser(this.userForm.value).subscribe(
        response => { this.ref.close(true) },
        error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
      )
    }
    if (this.isUpdate) {
      devConsoleLog(this.resetPassword)
      this.userForm.get('resetPassword')?.setValue(this.resetPassword);

      this.userService.editUser(this.user.id, this.userForm.value).subscribe(
        response => { this.ref.close(true) },
        error => { this.messageService.add({ severity: "error", summary: "Ocurrió un error", detail: error }) }
      )
    }

  }


}
