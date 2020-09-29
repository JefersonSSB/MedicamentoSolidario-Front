import { TestBed } from '@angular/core/testing';

import { SaidaListaService } from './saida-lista.service';

describe('SaidaListaService', () => {
  let service: SaidaListaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaidaListaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
