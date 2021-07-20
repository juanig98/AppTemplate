import { devConsoleLog } from 'src/app/config/helpers';
import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Permission } from 'src/app/models/Permission';
import { User } from 'src/app/models/User';
import { PermissionService } from 'src/app/services/users/permission.service';
import { UserService } from 'src/app/services/users/user.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-permissions-dual-list',
  templateUrl: './permissions-dual-list.component.html',
  styleUrls: ['./permissions-dual-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PermissionsDualListComponent implements OnInit {

  display: boolean = false;
  available: Permission[] = [];
  granted: Permission[] = [];

  @Input() userSelected: User | undefined;
  @Output() deselectUser = new EventEmitter<boolean>()
  constructor(
    private permissionService: PermissionService,
    private messageService: MessageService,
    private userService: UserService,
    private translateService: TranslateService
  ) {
    this.translateService.use("es")
  }

  ngOnInit(): void {
    if (this.userSelected)
      this.permissionService.getPermissions(this.userSelected).subscribe(
        response => {
          this.available = response.available;
          this.granted = response.granted;
          this.display = true;
        }
      )
  }

  updatePermissions(): void {
    if (this.userSelected)
      this.permissionService.updatePermissions(this.userSelected, this.granted).subscribe(
        response => { this.messageService.add({ severity: "success", summary: "Listo!", detail: "Permisos actualizados" }); this.userSelected = undefined; this.deselectUser.emit(true) },
        error => { devConsoleLog(error); this.messageService.add({ severity: "error", summary: "Ocurrió un error!", detail: error.error }) }
      )
  }

}
