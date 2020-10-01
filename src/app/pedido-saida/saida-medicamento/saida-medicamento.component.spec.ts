import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaMedicamentoComponent } from './saida-medicamento.component';

describe('SaidaMedicamentoComponent', () => {
  let component: SaidaMedicamentoComponent;
  let fixture: ComponentFixture<SaidaMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
