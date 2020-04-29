import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMedDialogComponent } from './add-med-dialog.component';

describe('AddMedDialogComponent', () => {
  let component: AddMedDialogComponent;
  let fixture: ComponentFixture<AddMedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
