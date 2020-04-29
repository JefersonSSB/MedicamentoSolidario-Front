import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPontoColetaComponent } from './info-ponto-coleta.component';

describe('InfoPontoColetaComponent', () => {
  let component: InfoPontoColetaComponent;
  let fixture: ComponentFixture<InfoPontoColetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoPontoColetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPontoColetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
