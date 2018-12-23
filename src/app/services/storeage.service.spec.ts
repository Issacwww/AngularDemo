import { TestBed } from '@angular/core/testing';

import { StoreageService } from './storeage.service';

describe('StoreageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreageService = TestBed.get(StoreageService);
    expect(service).toBeTruthy();
  });
});
