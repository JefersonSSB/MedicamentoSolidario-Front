import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoQuantidadeComponent } from './medicamento-quantidade.component';

describe('MedicamentoQuantidadeComponent', () => {
  let component: MedicamentoQuantidadeComponent;
  let fixture: ComponentFixture<MedicamentoQuantidadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentoQuantidadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoQuantidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
