import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleService } from '../services/simple-service.service';

import { PruebasBasicasComponent } from './pruebas-basicas.component';

class MockSimpleService {
  condicional(value: number) {
    return '';
  }
}

describe('PruebasBasicasComponent', () => {
  let component: PruebasBasicasComponent;
  let fixture: ComponentFixture<PruebasBasicasComponent>;
  let service: SimpleService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebasBasicasComponent],
      providers: [SimpleService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebasBasicasComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(SimpleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Cuando se ejecuta la funcion double', () => {
    it('Debería mostrar el resultado positivo de un número positivo elevado al cuadrado', () => {
      //Arrange
      const a = 5;
      const expected = 25;

      //Act
      const result = component.double(a);

      //Assert
      expect(result).toBe(expected);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('Debería mostrar el resultado positivo de un número negativo elevado al cuadrado', () => {
      //Arrange
      const a = -5;
      const expected = 25;

      //Act
      const result = component.double(a);

      //Assert
      expect(result).toBe(expected);
      expect(result).toBeGreaterThanOrEqual(0);
    });

    it('Debería retornar 0 cuando el valor enviado es 0', () => {
      //Arrange
      const a = 0;
      const expected = 0;

      //Act
      const result = component.double(a);

      //Assert
      expect(result).toEqual(expected);
      expect(result).toBe(0);
    });
  });

  describe('Cuando se ejecuta la funcion condicional', () => {
    it('Debería ejecutar la funcion del servicio sin mock', () => {
      //Arrange
      const value = 5;

      //Act
      const result = component.condicional(value);
      
      //Assert
      expect(result).toEqual('Positivo');
    });

    xit('Debería llamar la funcion del servicio con mock', () => {
      //Arrange
      const value = 5;

      //Act
      const result = component.condicional(value);

      //Assert
      expect(result).toEqual('');
    });

    xit('Debería llamar la funcion del servicio con un espia', () => {
      //Arrange
      spyOn(service, 'condicional').and.returnValue('Positivo');
      const value = 5;

      //Act
      const result = component.condicional(value);

      //Assert
      expect(result).toEqual('Positivo');
      expect(service.condicional).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cuando se ejecuta excepcion', () => {
    it('Debería lanzar una excepcion', () => {
      //Assert
      expect(() => component.excepcion()).toThrowError('Error');
    });
  });
});
