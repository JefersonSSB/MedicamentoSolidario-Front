import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMedicamentosComponent } from './my-medicamentos.component';

describe('MyMedicamentosComponent', () => {
  let component: MyMedicamentosComponent;
  let fixture: ComponentFixture<MyMedicamentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMedicamentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
