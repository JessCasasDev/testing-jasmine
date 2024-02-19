import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-hijo',
  templateUrl: './hijo.component.html',
  styleUrls: ['./hijo.component.scss'],
})
export class HijoComponent {
  @Input() habilitado!: boolean;
  @Output() enviarInformacion = new EventEmitter<{
    nombre: string;
    apellido: string;
  }>();

  formulario = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    apellido: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder) {}

  get nombre(): AbstractControl {
    return this.formulario.controls['nombre'];
  }

  enviaDatos() {
    if (this.formulario.valid) {
      this.enviarInformacion.emit(this.formulario.getRawValue());
    }
  }
}
