import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationsUsersListComponent } from './notifications-users-list.component';

describe('NotificationsUsersListComponent', () => {
  let component: NotificationsUsersListComponent;
  let fixture: ComponentFixture<NotificationsUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationsUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationsUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
