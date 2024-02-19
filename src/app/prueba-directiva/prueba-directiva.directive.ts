import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appPruebaDirectiva]'
})
export class PruebaDirectivaDirective {
  @HostBinding("style.background-color") backgroundColor!: string;
  
  @HostListener('mouseover') onHover() {
    this.backgroundColor = 'blue';
  }

  @HostListener('mouseout') onLeave() {
    this.backgroundColor = 'red';
  }
}
