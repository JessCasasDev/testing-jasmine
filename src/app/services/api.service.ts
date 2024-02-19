import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  cargando = false;

  constructor(private http: HttpClient) {}

  sendData(data: { name: string; email: string }) {
    return this.http.post('some-api/post-data', data).pipe(
      catchError((error) => {
        this.cargando = true;
        throw error;
      })
    );
  }

  getData(info: string) {
    return this.http.get(`some-api/get-data/${info}`, {
      params: { id: '1' },
    });
  }
}
