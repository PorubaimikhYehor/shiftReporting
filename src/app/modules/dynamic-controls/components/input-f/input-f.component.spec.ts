import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFComponent } from './input-f.component';

describe('InputFComponent', () => {
  let component: InputFComponent;
  let fixture: ComponentFixture<InputFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
