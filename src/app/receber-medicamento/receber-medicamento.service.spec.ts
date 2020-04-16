import { TestBed } from '@angular/core/testing';

import { ReceberMedicamentoService } from './receber-medicamento.service';

describe('ReceberMedicamentoService', () => {
  let service: ReceberMedicamentoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceberMedicamentoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
