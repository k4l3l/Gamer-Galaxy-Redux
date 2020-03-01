import { TestBed } from '@angular/core/testing';

import { DomProviderService } from './dom-provider.service';

describe('DomProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DomProviderService = TestBed.get(DomProviderService);
    expect(service).toBeTruthy();
  });
});
