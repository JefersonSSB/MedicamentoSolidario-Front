import { TestBed } from '@angular/core/testing';

import { PontoResolverGuard } from './ponto-resolver.guard';

describe('PontoResolverGuard', () => {
  let guard: PontoResolverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PontoResolverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
