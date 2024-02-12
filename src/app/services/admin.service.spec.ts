import { TestBed } from '@angular/core/testing';

import { Adminservice } from './admin.service'


describe('AdminService', () => {
  let service: Adminservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Adminservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
