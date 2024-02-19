import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
//import { HijoComponent } from '../hijo/hijo.component';

import { PadreComponent } from './padre.component';

@Component({selector: 'app-hijo'})
class HijoComponent{};

describe('PadreComponent', () => {
  let component: PadreComponent;
  let fixture: ComponentFixture<PadreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PadreComponent, HijoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PadreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
