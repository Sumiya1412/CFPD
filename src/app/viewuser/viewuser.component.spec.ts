import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserComponent } from './viewuser.component';

describe('ViewuserComponent', () => {
  let component: ViewUserComponent;
  let fixture: ComponentFixture<ViewUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewUserComponent]
    });
    fixture = TestBed.createComponent(ViewUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
