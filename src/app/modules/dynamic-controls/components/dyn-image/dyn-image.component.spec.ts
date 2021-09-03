import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynImageComponent } from './dyn-image.component';

describe('DynImageComponent', () => {
  let component: DynImageComponent;
  let fixture: ComponentFixture<DynImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
