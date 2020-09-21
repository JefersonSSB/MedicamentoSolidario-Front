import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComfirmaCpfComponent } from './comfirma-cpf.component';

describe('ComfirmaCpfComponent', () => {
  let component: ComfirmaCpfComponent;
  let fixture: ComponentFixture<ComfirmaCpfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComfirmaCpfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComfirmaCpfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
