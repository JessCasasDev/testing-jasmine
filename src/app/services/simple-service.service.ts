import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SimpleService {
  value = 0;
  condicional(value: number): string {
    if (value > 0) {
      return 'Positivo';
    } else if (value < 0) {
      return 'Negativo';
    } else {
      return 'Cero';
    }
  }  

  timeout(time: number): void {
    setTimeout(() => {
      this.value++;
    }, time);
  }

  promise(): Promise<number> {
    return Promise.resolve(0);
  }
}
