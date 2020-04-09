import { TestBed } from '@angular/core/testing';

import { MedicamentoResolverGuard } from './medicamento-resolver.guard';

describe('MedicamentoResolverGuard', () => {
  let guard: MedicamentoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MedicamentoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
