import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {

  constructor(
    private titleService: TitleService,
  ) {
    this.titleService.setTitle("Clientes")
  }

  ngOnInit(): void {
  }

}
