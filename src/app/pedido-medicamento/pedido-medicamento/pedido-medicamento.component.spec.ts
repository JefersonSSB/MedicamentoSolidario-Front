import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoMedicamentoComponent } from './pedido-medicamento.component';

describe('PedidoMedicamentoComponent', () => {
  let component: PedidoMedicamentoComponent;
  let fixture: ComponentFixture<PedidoMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
