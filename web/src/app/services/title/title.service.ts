import { Title } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  pretitle = "AppTemplate | ";
  title: string = "";
  private titleSubject = new Subject<string>();
  titleObservable = this.titleSubject.asObservable();

  constructor(
    private titleService: Title
  ) { }


  setTitle(title: string) {
    // Seteo el titulo de la barra de navegación
    this.title = title;
    this.titleSubject.next(title);
    // Seteo el titulo de la pagína/pestaña
    this.titleService.setTitle(this.pretitle + title);
  }

  // Otra implementación para el caso de solo querer cambiar el titulo de la pestaña
  setTitlePage(title: string) {
    this.titleService.setTitle(this.pretitle + title);
  }
}
