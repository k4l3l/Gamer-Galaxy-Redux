import { TestBed } from '@angular/core/testing';

import { ModalProviderService } from './modal-provider.service';

describe('ModalProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ModalProviderService = TestBed.get(ModalProviderService);
    expect(service).toBeTruthy();
  });
});
