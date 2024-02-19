import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { HijoComponent } from './hijo.component';

describe('HijoComponent', () => {
  let component: HijoComponent;
  let fixture: ComponentFixture<HijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HijoComponent],
      providers: [FormBuilder],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //probando inputs
  describe('Validar boton deshabilitado mediante el input', () => {
    it('No debería permitir hacer click si el input esta deshabilitado', () => {
      //Arrange
      spyOn(component.enviarInformacion, 'emit');
      component.formulario.setValue({ nombre: 'Luis', apellido: 'Gutierrez' });
      component.habilitado = false;
      
      //Act
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button')).nativeElement;
      button.click();

      //Assert
      expect(button.disabled).toBeTrue();
      expect(component.formulario.valid).toBeTrue();
      expect(component.enviarInformacion.emit).not.toHaveBeenCalled();
    });

    it('Debería permitir hacer click si el input esta habilitado', () => {
      //Arrange
      component.habilitado = true;

      //Act
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button'));

      //Assert
      expect(button.nativeElement.disabled).toBeFalse();
    });
  });

  //Probando Outputs
  describe('Debería enviar la informacion del formulario', () => {
    it('Debería enviar la informacion del formulario si esta valido', () => {
      //Arrange
      spyOn(component.enviarInformacion, 'emit');
      const informacion = { nombre: 'Pepito', apellido: 'Perez' };
      component.formulario.setValue(informacion);

      //Act
      component.enviaDatos();

      //Assert
      expect(component.formulario.valid).toBe(true);
      expect(component.enviarInformacion.emit).toHaveBeenCalledWith(
        informacion
      );
    });

    it('No debería enviar la informacion si el formulario no es valido', () => {
      //Arrange
      spyOn(component.enviarInformacion, 'emit');

      //Act
      component.enviaDatos();

      //Assert
      expect(component.formulario.valid).toBe(false);
      expect(component.enviarInformacion.emit).not.toHaveBeenCalled();
    });
  });

  //probando el formulario
  describe('Debería enviar la informacion adecuada', () => {
    it('Debería validar que el nombre es requerido', () => {
      //Arrange
      component.nombre.setValue('');
      component.nombre.markAsDirty();
      //Act

      //Assert
      expect(component.nombre.valid).toBeFalse();
      expect(component.nombre.errors).toEqual({ required: true });
    });
    
    it('Debería validar que el nombre debe tener 3 caracteres', () => {
      //Arrange
      component.nombre.setValue('12');
      component.nombre.markAsDirty();
      //Act

      //Assert
      expect(component.nombre.valid).toBeFalse();
      expect(component.nombre.errors).toEqual({
        minlength: { actualLength: 2, requiredLength: 3 },
      });
    });
  });
});
