import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { devConsoleLog } from '../config/helpers';
import { User } from '../models/User';
import { AuthService } from '../services/auth/auth.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  private user!: User;                            // Usuario
  private permission!: number | number[];         // Permiso único o lista de permisos (array)
  private allPermissionRequired: boolean = false; // Requiere todos los permisos (caso de array de permisos)

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }

  @Input()
  set appPermission(statement: PermissionStatement) {
    this.permission = statement.permission; // Seteo de permiso/s
    if (Array.isArray(this.permission) && statement.allRequired) this.allPermissionRequired = true; // Seteo de requerimiento en caso de ser una lista
    this.user = this.authService.getUser(); // Seteo de usuario
    this.updateView(); // Actualizado de componente
  }


  /**
   * Actualiza la vista del componente
   */
  private updateView(): void {
    // Se limpia el contenedor (del componente)
    this.viewContainer.clear();

    // El componente se renderiza si:
    //      No require permisos
    //      El usuario tiene los permiso/s requerido/s
    if (this.notRequirePermission() || this.checkPermission()) this.viewContainer.createEmbeddedView(this.templateRef);
  }

  /**
   * Chequea si el componente requiere de permisos
   * @returns boolean
   */
  private notRequirePermission(): boolean { return this.permission == 0 }

  /**
   * Chequea si el usuario tiene los permisos requeridos sobre el componente
   * @returns boolean
   */
  private checkPermission(): boolean {
    try {
      if (!this.user) throw new Error("");

      // Si es más de un permiso (array de permisos)
      if (Array.isArray(this.permission)) {
        let hasPermission = false;

        // Requiere de todos los permisos del componente
        if (this.allPermissionRequired) {
          let permissionsRequired = this.permission;

          // Filtro los permisos que requiere con los que el usuario tiene otorgados
          this.permission.map(p => { if (this.user.user_permissions.includes(p)) permissionsRequired = permissionsRequired.filter(p2 => p2 != p); })

          // El usuario tiene permiso para ver el componente si se filtraron todos los permisos requeridos
          return permissionsRequired.length == 0;

        } else { // Requiere solo uno de los permisos del componente

          // Si encuentro un permiso en la lista, el usuario tiene permiso
          this.permission.map(p => { if (this.user.user_permissions.includes(p)) hasPermission = true; })

          return hasPermission;
        }
      } else { // Si es solo un permiso requerido
        return this.user.user_permissions.includes(this.permission);
      }
    } catch { // Si falla no tiene permisos
      return false;
    }
  }
}

interface PermissionStatement {
  permission: number | number[];
  allRequired?: boolean;
}
