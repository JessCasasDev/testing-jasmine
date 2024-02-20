import { HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

xdescribe('ApiService', () => {
  let service: ApiService;
  let controller: HttpTestingController;

  const datos = {
    name: 'Mi Nombre',
    email: 'unemail@email.com',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // validar que después de todos tests aun no hayan mas peticiones pendientes
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Pruebas HTTP_CLIENT', () => {
    describe('POST', () => {
      it('Enviar datos', () => {
        //llamar al servicio
        service.sendData(datos).subscribe();

        //Expect one va a hacer match con la URL de la solicitud
        const request = controller.expectOne('some-api/post-data');

        //Ahora validar que se haya enviado un POST
        expect(request.request.method).toEqual('POST');

        //validar que se haya enviado los datos correctos
        expect(request.request.body).toEqual(datos);
        expect(request.request.url).toEqual('some-api/post-data');
      });
    });

    describe('GET', () => {
      it('getData', () => {
        const info = 'informacion';
        const response = {
          testing: 'testing',
        };

        //Llamar al servicio
        service.getData(info).subscribe((data) => {
          //Validar que los datos son los mismos
          expect(data).toEqual(response);
        });
        
        //Expect one va a hacer match con la URL de la solicitud
        const request = controller.expectOne(`some-api/get-data/${info}?id=1`);
        //Responder con datos mock
        request.flush(response);
        //Validar params
        expect(request.request.params.get('id')).toBe('1');
        //Ahora validar que se haya enviado un GET
        expect(request.request.method).toEqual('GET');
      });

      it('getData', () => {
        const info = 'informacion';
        const mockData = {
          testing: 'testing',
        };
        let actualInfo = {};

        //Llamar al servicio
        service.getData(info).subscribe((data) => {
          actualInfo = data;
        });

        //Expect one va a hacer match con la URL de la solicitud
        //También se puede llamar con más parametros por si se necesita mayor especificidad
        const request = controller.expectOne({
          method: 'GET',
          url: `some-api/get-data/${info}?id=1`
        });

        //Responder con datos mock
        request.flush(mockData);

        controller.verify();

        expect(actualInfo).toEqual(mockData);

        //Ahora validar que se haya enviado un GET
        expect(request.request.method).toEqual('GET');
      });
    });

    describe('ERROR', () => {
      it('get error', () => {
        const status = 500;
        const statusText = 'Internal Server Error';
        const errorEvent = new ErrorEvent('API error');

        //Llamar al servicio
        service.sendData(datos).subscribe({
          error: (err) => {
            expect(err.status).toBe(500);
            expect(err.status).toBe(status);
            expect(err.statusText).toBe(statusText);
            expect(service.cargando).toBeTrue();
          },
        });

        //Expect one va a hacer match con la URL de la solicitud
        const request = controller.expectOne('some-api/post-data');
        //Responder con error
        request.error(errorEvent, { status, statusText });

        //Ahora validar que se haya enviado un POST
        expect(request.request.method).toEqual('POST');
      });
    });
  });
});
