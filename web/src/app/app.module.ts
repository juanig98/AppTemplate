import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule, registerLocaleData } from '@angular/common';

import localeEsAr from "@angular/common/locales/es-AR";

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

const primeModules = [
  InputMaskModule, InputNumberModule, TabMenuModule, AccordionModule, SidebarModule, MenubarModule,
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
import { TableUsersComponent } from './views/components/table-users/table-users.component';
import { CookieService } from 'ngx-cookie-service';
import { PermissionDirective } from './directives/permission.directive';
import { MessageService } from 'primeng/api';

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
  ],
  imports: [
    ...angularModules,
    ...primeModules
  ],
  exports: [
    AppRoutingModule,
  ],
  providers: [
    MessageService,
    CookieService,
    { provide: LOCALE_ID, useValue: 'es-AR' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
