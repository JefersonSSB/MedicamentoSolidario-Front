import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoUsuarioComponent } from './pedido-usuario.component';

describe('PedidoUsuarioComponent', () => {
  let component: PedidoUsuarioComponent;
  let fixture: ComponentFixture<PedidoUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PedidoUsuarioComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
