import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListResearchersComponent } from './list-researchers.component';

describe('ListResearchersComponent', () => {
  let component: ListResearchersComponent;
  let fixture: ComponentFixture<ListResearchersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListResearchersComponent]
    });
    fixture = TestBed.createComponent(ListResearchersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
