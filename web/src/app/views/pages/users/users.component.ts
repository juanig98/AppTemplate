import { User } from 'src/app/models/User';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() userSelected: User | null | undefined;

  constructor() { }

  ngOnInit(): void {
  }




}
