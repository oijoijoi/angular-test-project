import { TestBed } from '@angular/core/testing';

import { Customers.BackendService } from './customers.backend.service';

describe('Customers.BackendService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Customers.BackendService = TestBed.get(Customers.BackendService);
    expect(service).toBeTruthy();
  });
});
