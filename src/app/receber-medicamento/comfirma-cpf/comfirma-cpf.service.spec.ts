import { TestBed } from '@angular/core/testing';

import { ComfirmaCpfService } from './comfirma-cpf.service';

describe('ComfirmaCpfService', () => {
  let service: ComfirmaCpfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComfirmaCpfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
