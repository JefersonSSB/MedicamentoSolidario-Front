import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoPontoComponent } from './pedido-ponto.component';

describe('PedidoPontoComponent', () => {
  let component: PedidoPontoComponent;
  let fixture: ComponentFixture<PedidoPontoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoPontoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoPontoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
