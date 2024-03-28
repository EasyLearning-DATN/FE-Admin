import { TestBed } from '@angular/core/testing';

import { CreatePackageService } from './create-package.service';

describe('CreatePackageService', () => {
  let service: CreatePackageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePackageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
