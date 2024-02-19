import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

xdescribe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>; 
  // Es el componente de Angular encapsulado en un 
  //fixture el cual provee metodos para facilitar las pruebas

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`Debería tener titulo como 'testing-jasmine'`, () => {
    expect(component.title).toEqual('testing-jasmine');
  });

  it('Debería renderiza el titulo', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'testing-jasmine app is running!'
    );
  });

  it('Debería mostrar otro titulo despues de hacer click en el boton', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const button = fixture.debugElement.query(By.css('button'));

    button.nativeElement.click();
    fixture.detectChanges();

    expect(compiled.querySelector('.content span')?.textContent).toContain(
      'Otro'
    );
  });
});
