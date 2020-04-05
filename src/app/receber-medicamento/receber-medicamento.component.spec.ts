import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReceberMedicamentoComponent } from './receber-medicamento.component';

describe('ReceberMedicamentoComponent', () => {
  let component: ReceberMedicamentoComponent;
  let fixture: ComponentFixture<ReceberMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReceberMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceberMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
