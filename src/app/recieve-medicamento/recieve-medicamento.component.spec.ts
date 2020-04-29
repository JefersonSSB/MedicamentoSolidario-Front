import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveMedicamentoComponent } from './recieve-medicamento.component';

describe('RecieveMedicamentoComponent', () => {
  let component: RecieveMedicamentoComponent;
  let fixture: ComponentFixture<RecieveMedicamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecieveMedicamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecieveMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
