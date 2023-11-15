import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPubComponent } from './edit-pub.component';

describe('EditPubComponent', () => {
  let component: EditPubComponent;
  let fixture: ComponentFixture<EditPubComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPubComponent]
    });
    fixture = TestBed.createComponent(EditPubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
