import { TestBed } from '@angular/core/testing';

import { TeamMember1Service } from './team-member1.service';

describe('TeamMember1Service', () => {
  let service: TeamMember1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeamMember1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
