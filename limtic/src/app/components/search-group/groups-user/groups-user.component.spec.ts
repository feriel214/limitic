import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupsUserComponent } from './groups-user.component';

describe('GroupsUserComponent', () => {
  let component: GroupsUserComponent;
  let fixture: ComponentFixture<GroupsUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsUserComponent]
    });
    fixture = TestBed.createComponent(GroupsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
