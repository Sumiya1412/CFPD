import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMember1DetailsComponent } from './team-member1-details.component';

describe('TeamMember1DetailsComponent', () => {
  let component: TeamMember1DetailsComponent;
  let fixture: ComponentFixture<TeamMember1DetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamMember1DetailsComponent]
    });
    fixture = TestBed.createComponent(TeamMember1DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
