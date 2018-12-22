import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersWelcomeComponent } from './customers-welcome.component';

describe('CustomersWelcomeComponent', () => {
  let component: CustomersWelcomeComponent;
  let fixture: ComponentFixture<CustomersWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
