import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import localeEsAr from "@angular/common/locales/es-AR";
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

const angularModules = [
  CommonModule, BrowserAnimationsModule, ReactiveFormsModule, AppRoutingModule,
  BrowserModule, HttpClientModule, FormsModule,]

// Prime Modules
import { SlideMenuModule } from 'primeng/slidemenu';
import { MegaMenuModule } from 'primeng/megamenu';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CalendarModule } from 'primeng/calendar';
import { SelectButtonModule } from 'primeng/selectbutton';
import { PasswordModule } from 'primeng/password';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabMenuModule } from 'primeng/tabmenu';
import { AccordionModule } from 'primeng/accordion';
import { SidebarModule } from 'primeng/sidebar';
import { MenubarModule } from 'primeng/menubar';
import { PickListModule } from 'primeng/picklist';
import { ToggleButtonModule } from 'primeng/togglebutton';

const primeModules = [
  ToggleButtonModule,
  InputMaskModule, InputNumberModule, TabMenuModule, AccordionModule, SidebarModule, MenubarModule, PickListModule,
  DynamicDialogModule, ConfirmDialogModule, ToastModule, BlockUIModule, PanelModule, MessagesModule, MessageModule,
  SelectButtonModule, CalendarModule, InputSwitchModule, PasswordModule, SlideMenuModule, MegaMenuModule, ListboxModule,
  InputTextModule, TableModule, ButtonModule, CheckboxModule, RadioButtonModule, DropdownModule, InputTextareaModule, TabViewModule
];

registerLocaleData(localeEsAr, "es-AR");

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/pages/login/login.component';
import { HomeComponent } from './views/pages/home/home.component';
import { LogoutComponent } from './views/components/common/logout/logout.component';
import { NavMenuComponent } from './views/components/common/nav-menu/nav-menu.component';
import { UsersComponent } from './views/pages/users/users.component';
import { TableUsersComponent } from './views/components/users/table-users/table-users.component';
import { CookieService } from 'ngx-cookie-service';
import { PermissionDirective } from './directives/permission.directive';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogUserComponent } from './views/components/users/dialog-user/dialog-user.component';
import { ClientsComponent } from './views/pages/clients/clients.component';
import { PermissionsDualListComponent } from './views/components/users/permissions-dual-list/permissions-dual-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LogoutComponent,
    NavMenuComponent,
    UsersComponent,
    TableUsersComponent,
    PermissionDirective,
    DialogUserComponent,
    ClientsComponent,
    PermissionsDualListComponent,
  ],
  imports: [
    ...angularModules,
    ...primeModules,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    AppRoutingModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    CookieService,
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
