import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicamentoInfoComponent } from './medicamento-info.component';

describe('MedicamentoInfoComponent', () => {
  let component: MedicamentoInfoComponent;
  let fixture: ComponentFixture<MedicamentoInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicamentoInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicamentoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
