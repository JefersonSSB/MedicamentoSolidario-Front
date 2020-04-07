import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  address: string;
  age: number;
  name: string;
}


@Component({
  selector: 'app-receber-medicamento',
  templateUrl: './receber-medicamento.component.html',
  styleUrls: ['./receber-medicamento.component.css']
})



export class ReceberMedicamentoComponent implements OnInit {

  public myForm: FormGroup;
  public lastForm: FormGroup;
  public medicamento: FormArray;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) { }



  ngOnInit(): void {
    this.myForm = this.formBuilder.group({
      medicamento: this.formBuilder.array([this.model()]),
    });
    this.remove(0);
  }

  model(): FormGroup {
    return this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  public save(): void {
    console.log(this.myForm.getRawValue())
  }

  public add(): void {
    this.medicamento = this.myForm.get('medicamento') as FormArray
    this.medicamento.push(this.model())
    this.openDialog(this.medicamento.length - 1, 'add');
  }
  public remove(index: number): void {
    this.medicamento = this.myForm.get('medicamento') as FormArray
    this.medicamento.removeAt(index)
  }

  openDialog(index: number, entrada: string): void {
    const mode = Object.assign((<FormArray>this.myForm.get('medicamento')).at(index).value);
    console.log(mode);

    const dialogRef = this.dialog.open(FormMedicamentoComponent, {
      width: '60%',
      data: mode
    });
    dialogRef.disableClose = true;


    dialogRef.afterClosed().subscribe(result => {

      try {
        if (result == false && entrada == 'add') {
          this.remove(index);
        }
        else {
          (<FormArray>this.myForm.get('medicamento')).at(index).patchValue(result);
        }
      }
      catch (e) {
        if (result === undefined) {
          this.remove(index);
        }
      }
    })

  }




}


@Component({
  selector: 'form-medicamento.component',
  templateUrl: './form-medicamento.component.html',
  styleUrls: ['./form-medicamento.component.css']
})

export class FormMedicamentoComponent implements OnInit {


  public formGroup: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormMedicamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder, ) { }


  ngOnInit(): void {

    this.formGroup = this.formBuilder.group({

      name: ['', Validators.required],
      age: ['', Validators.required],
      address: ['', Validators.required],
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

}
