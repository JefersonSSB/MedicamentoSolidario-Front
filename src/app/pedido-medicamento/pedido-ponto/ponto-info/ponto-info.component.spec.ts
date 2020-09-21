import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PontoInfoComponent } from './ponto-info.component';

describe('PontoInfoComponent', () => {
  let component: PontoInfoComponent;
  let fixture: ComponentFixture<PontoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PontoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PontoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
