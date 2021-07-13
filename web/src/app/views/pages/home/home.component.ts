import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Home")
  }

}
