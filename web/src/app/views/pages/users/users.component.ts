import { User } from 'src/app/models/User';
import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DialogUserComponent } from '../../components/users/dialog-user/dialog-user.component';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DialogService]
})
export class UsersComponent implements OnInit {

  @Input() userSelected: User | null | undefined;

  constructor(public dialogService: DialogService) { }

  ngOnInit(): void {
  }


  addUser(){
    const ref = this.dialogService.open(DialogUserComponent, {
      header: 'Agregar usuario',
      width: '70%'
  });
  }



}
