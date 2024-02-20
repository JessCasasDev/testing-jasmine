import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SimpleService } from './simple-service.service';

xdescribe('SimpleService', () => {
  let service: SimpleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimpleService);
  });

  describe('Debería validar el condicional', () => {
    it("Debería validar que retorne 'Positivo' si el número es mayor a 0", () => {
      //Arrange
      const value = 10;
      const expected = 'Positivo';

      //Act
      const result = service.condicional(value);

      //Assert
      expect(result).toEqual(expected);
      expect(value).toBeGreaterThan(0);
    });

    it("Debería validar que retorne 'Negativo' si el número es menor a 0", () => {
      //Arrange
      const value = -10;
      const expected = 'Negativo';

      //Act
      const result = service.condicional(value);

      //Assert
      expect(result).toEqual(expected);
      expect(value).toBeLessThan(0);
    });

    it("Debería validar que retorne 'Cero' si el número es 0", () => {
      //Arrange
      const value = 0;
      const expected = 'Cero';

      //Act
      const result = service.condicional(value);

      //Assert
      expect(result).toEqual(expected);
      expect(value).toBe(0);
    });

    it("Debería validar que retorne 'Positivo' si el número Infinito", () => {
      //Arrange
      const value = Infinity;
      const expected = 'Positivo';

      //Act
      const result = service.condicional(value);

      //Assert
      expect(result).toEqual(expected);
      expect(value).toBeGreaterThan(0);
    });

    it("Debería validar que retorne 'Negativo' si el número -Infinito", () => {
      //Arrange
      const value = -Infinity;
      const expected = 'Negativo';

      //Act
      const result = service.condicional(value);

      //Assert
      expect(result).toEqual(expected);
      expect(value).toBeLessThan(0);
    });
  });

  describe('Cuando hay una operacion asyncrona', () => {
    it('Debería validarse el paso del tiempo', fakeAsync(() => {
      const time = 4000;
      service.timeout(time);

      tick(time);

      expect(service.value).toBe(1);
    }));
  });

  describe('Cuando hay una promesa', () => {
    it('Debería usar done', (done) => {
      service.promise().then((newVal) => {
        expect(newVal).toBe(0);
        done();
      });
    });
  });
});
