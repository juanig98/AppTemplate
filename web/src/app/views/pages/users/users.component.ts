import { User } from 'src/app/models/User';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogUserComponent } from '../../components/users/dialog-user/dialog-user.component';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService]
})
export class UsersComponent implements OnInit {

  @Input() userSelected: User | undefined;

  constructor(
    private titleService: TitleService,
  ) {
    this.titleService.setTitle("Usuarios");
  }

  ngOnInit(): void {
  }


  onUserSelected(user: User) { this.userSelected = user; this.titleService.setTitle(`Permisos de ${user.username}`) }
  deselectUser(): void { this.userSelected = undefined }

}
