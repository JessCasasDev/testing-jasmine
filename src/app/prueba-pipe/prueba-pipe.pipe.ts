import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pruebaPipe',
})
export class PruebaPipePipe implements PipeTransform {
  transform(value: any): string {
    if (!value) return '';
    return value.toUpperCase();
  }
}
