import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { User } from 'src/app/models/User';
import { Route } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavMenuComponent implements OnInit {

  displaySidebar = false;
  user!: User;
  items: MenuItem[];
  sidebarMenu: ItemSidebar[];



  constructor(private authService: AuthService) {
    this.items = [
      {
        label: 'File',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            { label: 'Project' },
            { label: 'Other' },
          ]
        },
        { label: 'Open' },
        { label: 'Quit' }
        ]
      }
    ];

    this.sidebarMenu = [
      { permission: 0, label: "Home", link: "/home" },
      { permission: 36, label: "Clientes", link: "/clientes" },
      { permission: 16, label: "Usuarios", link: "/usuarios" },
    ]
  }

  ngOnInit(): void {
    setTimeout(() => { this.user = this.authService.getUser() }, 500)
  }

}


interface ItemSidebar {
  permission: number
  label: string;
  link: string;
  icon?: string;
  children?: ItemSidebar[];
}
