import { TestBed } from '@angular/core/testing';

import { CategoriaIeService } from './categoria-ie.service';

describe('CategoriaIeService', () => {
  let service: CategoriaIeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaIeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
