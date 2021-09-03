import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynTableComponent } from './dyn-table.component';

describe('DynTableComponent', () => {
  let component: DynTableComponent;
  let fixture: ComponentFixture<DynTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
