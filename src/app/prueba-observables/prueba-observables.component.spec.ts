import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ApiService } from '../services/api.service';

import { PruebaObservablesComponent } from './prueba-observables.component';

describe('PruebaObservablesComponent', () => {
  let component: PruebaObservablesComponent;
  let fixture: ComponentFixture<PruebaObservablesComponent>;
  const serviceSpy = jasmine.createSpyObj<ApiService>('ApiService', [
    'sendData',
    'getData',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PruebaObservablesComponent],
      providers: [{ provide: ApiService, useValue: serviceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaObservablesComponent);
    component = fixture.componentInstance;

  //  serviceSpy.getData.and.returnValue(of('resultado'));
    serviceSpy.getData.calls.reset();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Enviar informacion', () => {
    it('Debería enviar la informacion adecuada', () => {
      serviceSpy.sendData.and.returnValue(of());
      const datos = { name: 'Dolores', email: 'dolores@email.com' };

      component.enviarInformacion();

      expect(serviceSpy.sendData).toHaveBeenCalledOnceWith(datos);
    });
  });

  describe('obtenerInformacion', () => {
    it('Debería asignar los datos correctos', () => {
      //Arrange
      const resultado = {
        testing: 'testing',
      };
      serviceSpy.getData.and.returnValue(of(resultado));

      //fixture.detectChanges();
      //obteniendo el elemento html de la tabla
      //const elements = fixture.debugElement.queryAll(By.css("td"));

      //Act
      component.obtenerInformacion();

      //expect(elements.length).toBe(5);
      //Assert
      expect(component.datos).toEqual(resultado);
      expect(serviceSpy.getData).toHaveBeenCalledTimes(1);
    });

    it('Debería mostrar error si hay un error en la peticion', () => {
      //Arrange
      const error = 'Error en el servicio';
      serviceSpy.getData.and.returnValue(throwError(error));

      //Act
      component.obtenerInformacion();

      //Assert
      expect(component.error).toEqual(error);
    });
  });

  describe('observableSimple', () => {
    xit('con subscribe', () => {
      component.observableSimple().subscribe((resultado) => {
       // expect(false).toEqual(true);
      });
    });
    
    it('con subscribe y done', (done) => {
      component.observableSimple().subscribe((resultado) => {
        expect(resultado).toEqual([1, 2, 3, 4]);
       // expect(false).toEqual(true);
        done();
      });
    });

    it('con fakeAsync', fakeAsync(() => {
      let resultado: number[] = [];

      component.observableSimple().subscribe((value) => (resultado = value));
      tick(1000);

      //flushMicrotasks();

      expect(resultado).toEqual([1, 2, 3, 4]);
    }));

    describe('Probar subscripcion', () => {
      xit('con subscribe', () => {
        component.subscripcionAObservable();

        expect(component.datos).toEqual([1, 2, 3, 4]);
      });

      it('con fakeAsync', fakeAsync(() => {
        component.subscripcionAObservable();
        tick(1000);

        expect(component.datos).toEqual([1, 2, 3, 4]);
      }));
    });
  });

  describe('ObservableComplejo', () => {
    xit('con subscribe', () => {
      serviceSpy.getData.and.returnValue(of('resultado'));
      const event = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        shiftKey: false,
      });
      
      component.observableComplejo().subscribe((resultado: any) => {
        expect(false).toEqual(true);
      });

      component.searchKeywords.nativeElement.value = '1234';
      component.searchKeywords.nativeElement.dispatchEvent(event);
    });

    it('con subscribe y done', (done) => {
      serviceSpy.getData.and.returnValue(of('resultado'));
      const event = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        shiftKey: false,
      });
      
      component.observableComplejo().subscribe((resultado: any) => {
        expect(resultado).toEqual(42);
        done();
      });

      component.searchKeywords.nativeElement.value = '1234';
      component.searchKeywords.nativeElement.dispatchEvent(event);

    });

    it('con fakeAsync', fakeAsync(() => {
      serviceSpy.getData.and.returnValue(of('resultado'));
      const event = new KeyboardEvent('keyup', {
        bubbles: true,
        cancelable: true,
        shiftKey: false,
      });
      let resultado!: number;

      component
        .observableComplejo()
        .subscribe((value: any) => (resultado = value));

      component.searchKeywords.nativeElement.value = '1234';
      component.searchKeywords.nativeElement.dispatchEvent(event);
      
      tick(Infinity);
      
      expect(resultado).toEqual(42);
      expect(serviceSpy.getData).toHaveBeenCalled();
    }));
  });
});
