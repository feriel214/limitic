import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailResearcherComponent } from './detail-researcher.component';

describe('DetailResearcherComponent', () => {
  let component: DetailResearcherComponent;
  let fixture: ComponentFixture<DetailResearcherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailResearcherComponent]
    });
    fixture = TestBed.createComponent(DetailResearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
