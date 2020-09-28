import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaidaUsuarioComponent } from './saida-usuario.component';

describe('SaidaUsuarioComponent', () => {
  let component: SaidaUsuarioComponent;
  let fixture: ComponentFixture<SaidaUsuarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaidaUsuarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaidaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
