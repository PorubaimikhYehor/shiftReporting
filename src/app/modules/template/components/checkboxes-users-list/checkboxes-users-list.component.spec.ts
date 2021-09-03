import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesUsersListComponent } from './checkboxes-users-list.component';

describe('CheckboxesUsersListComponent', () => {
  let component: CheckboxesUsersListComponent;
  let fixture: ComponentFixture<CheckboxesUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxesUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
