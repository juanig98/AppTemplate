import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-table-clients',
  templateUrl: './table-clients.component.html',
  styleUrls: ['./table-clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableClientsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
