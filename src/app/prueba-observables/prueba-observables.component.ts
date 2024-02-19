import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, of } from 'rxjs';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-prueba-observables',
  templateUrl: './prueba-observables.component.html',
  styleUrls: ['./prueba-observables.component.scss'],
})
export class PruebaObservablesComponent implements OnInit {
  datos: any;
  error: any;
  @ViewChild('searchKeywords') searchKeywords!: ElementRef;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
   // this.apiService.getData('informacion').subscribe();
  }

  obtenerInformacion() {
    this.apiService.getData('informacion').subscribe({
      next: (datos) => {
        this.datos = datos;
      },
      error: (error) => {
        this.error = error;
      },
    });
  }

  enviarInformacion() {
    this.apiService
      .sendData({ name: 'Dolores', email: 'dolores@email.com' })
      .subscribe();
  }

  observableSimple() {
    return of([1, 2, 3, 4]).pipe(delay(1000));
  }

  subscripcionAObservable() {
    this.observableSimple().subscribe((datos) => (this.datos = datos));
  }

  observableComplejo() {
    return fromEvent<string>(this.searchKeywords.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      debounceTime(1000),
      filter((text: string) => text.length > 2),
      distinctUntilChanged(),
      switchMap((search: string) => this.apiService.getData(search)),
      map(() => 42)
    );
  }
}
