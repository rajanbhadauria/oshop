import { TestBed, inject } from '@angular/core/testing';

import { AdminAuthGaurdService } from '../../../../app/shared/services/admin-auth-gaurd.service';

describe('AdminAuthGaurdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminAuthGaurdService]
    });
  });

  it('should be created', inject([AdminAuthGaurdService], (service: AdminAuthGaurdService) => {
    expect(service).toBeTruthy();
  }));
});
