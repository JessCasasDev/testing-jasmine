import { Component } from '@angular/core';
import { SimpleService } from '../services/simple-service.service';

@Component({
  selector: 'app-pruebas-basicas',
  templateUrl: './pruebas-basicas.component.html',
  styleUrls: ['./pruebas-basicas.component.scss'],
})
export class PruebasBasicasComponent {
  constructor(private simpleService: SimpleService) {}

  double(value: number): number {
    return value * value;
  }

  condicional(value: number): string {
    return this.simpleService.condicional(value);
  }

  excepcion() {
    throw new Error('Error');
  }
}
