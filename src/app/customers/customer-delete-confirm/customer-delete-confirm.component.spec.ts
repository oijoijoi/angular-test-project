import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerDeleteConfirmComponent } from './customer-delete-confirm.component';

describe('CustomerDeleteConfirmComponent', () => {
  let component: CustomerDeleteConfirmComponent;
  let fixture: ComponentFixture<CustomerDeleteConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerDeleteConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerDeleteConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
