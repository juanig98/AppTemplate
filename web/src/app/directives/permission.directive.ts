import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { User } from '../models/User';
import { AuthService } from '../services/auth/auth.service';

@Directive({
  selector: '[appPermission]'
})
export class PermissionDirective {

  private user!: User;
  private permission: number = 0;

  constructor(
    private authService: AuthService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) { }


  @Input()
  set appPermission(permission: number) {
    this.permission = permission;
    this.user = this.authService.getUser();
    this.updateView();
  }

  private updateView(): void {
    this.viewContainer.clear();
    if (this.checkPermission()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }

  private checkPermission(): boolean {
    try {
      if (this.permission == 0) return true;
      if (!this.user) throw new Error("");
      return this.user.user_permissions.includes(this.permission);
    } catch {
      return false;
    }
  }
}
