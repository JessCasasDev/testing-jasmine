import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PruebaDirectivaDirective } from './prueba-directiva.directive';

xdescribe('PruebaDirectivaDirective', () => {
  it('should create an instance', () => {
    const directive = new PruebaDirectivaDirective();
    expect(directive).toBeTruthy();
  });
});

@Component({
  template: `<div appPruebaDirectiva>Some Text</div>`,
})
class TestPruebaDirectivaComponent {}
describe('TestPruebaDirectivaComponent', () => {
  let fixture: ComponentFixture<TestPruebaDirectivaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestPruebaDirectivaComponent, PruebaDirectivaDirective],
    });
    fixture = TestBed.createComponent(TestPruebaDirectivaComponent);
  });

  describe('Probando la directiva', () => {
    it('Cuando hace hover in', () => {
      const item = fixture.debugElement.query(By.css('div'));
      item.triggerEventHandler('mouseover', null);
      fixture.detectChanges();

      expect(item.nativeElement.style.backgroundColor).toBe('blue');
    });
    it('Cuando hace hover out', () => {
      const item = fixture.debugElement.query(By.css('div'));
      item.triggerEventHandler('mouseout', null);

      fixture.detectChanges();
      expect(item.nativeElement.style.backgroundColor).toBe('red');
    });
  });
});
