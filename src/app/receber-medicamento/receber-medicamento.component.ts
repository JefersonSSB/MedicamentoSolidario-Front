import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ReceberMedicamentoService } from "./receber-medicamento.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

export interface DialogData {
  dataValidade: string;
  nome: string;
  principio: string;
  quantidade: number;
  tarja: string;
  tipoArmazenamento: string;
  tipoReceita: string;
}

@Component({
  selector: "app-receber-medicamento",
  templateUrl: "./receber-medicamento.component.html",
  styleUrls: ["./receber-medicamento.component.css"],
})
export class ReceberMedicamentoComponent implements OnInit {

  public formDoacao: FormGroup;
  public medicamentos: FormArray;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private receberMedicamentoService: ReceberMedicamentoService,
    private _snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {

    this.formDoacao = this.formBuilder.group({
      idDoador: [1, Validators.required],
      idPonto: [1, Validators.required],
      idVoluntario: [1, Validators.required],
      obs: ['Inserido', Validators.required],
      medicamentos: this.formBuilder.array([this.medicamento()]),
    });
    this.remove(0);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  medicamento(): FormGroup {
    return this.formBuilder.group({
      nome: ["", Validators.required],
      dataValidade: ["", Validators.required],
      principio: ["", Validators.required],
      quantidade: ["", Validators.required],
      tarja: ["", Validators.required],
      tipoArmazenamento: ["", Validators.required],
      tipoReceita: ["", Validators.required],
    });
  }

  public add(): void {
    this.medicamentos = this.formDoacao.get('medicamentos') as FormArray
    this.medicamentos.push(this.medicamento())
    this.openDialog(this.medicamentos.length - 1, 'add');
  }
  public remove(index: number): void {
    this.medicamentos = this.formDoacao.get('medicamentos') as FormArray
    this.medicamentos.removeAt(index)
  }

  openDialog(index: number, entrada: string): void {
    const mode = Object.assign((<FormArray>this.formDoacao.get('medicamentos')).at(index).value);
    const dialogRef = this.dialog.open(FormMedicamentoComponent, {
      width: "60%",
      height: '100%',
      data: mode,
    });
    dialogRef.disableClose = true;

    dialogRef.afterClosed().subscribe((result) => {
      try {
        if (result == false && entrada == "add") {
          this.remove(index);
        } else {
          (<FormArray>this.formDoacao.get("medicamentos"))
            .at(index)
            .patchValue(result);
        }

      }
      catch (e) {
        if (result === undefined) {
          this.remove(index);
        }
      }
    });
  }
  onSubmit() {
    this.medicamentos = this.formDoacao.get('medicamentos') as FormArray;
    if (this.formDoacao.valid && this.medicamentos.length > 0) {
      console.log(JSON.stringify(this.formDoacao.value));
      this.receberMedicamentoService.save(this.formDoacao.value).subscribe(
        success => {
          this.openSnackBar('Salvo com sucesso', 'X'),
            this.router.navigate(['/']);
        },
        (error) => this.openSnackBar("Erro Desconhecido", "X"),
        () => console.log("request completo")
      );
    } else {
      this.openSnackBar("Form Invalido", "X");
    }
  }
}

@Component({
  selector: "form-medicamento.component",
  templateUrl: "./form-medicamento.component.html",
  styleUrls: ["./form-medicamento.component.css"],
})
export class FormMedicamentoComponent implements OnInit {


  public formMedicamentoDiagol: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<FormMedicamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.formMedicamentoDiagol = this.formBuilder.group({
      nome: ['', Validators.required],
      dataValidade: ['', Validators.required],
      principio: ['', Validators.required],
      quantidade: ['', Validators.required],
      tarja: ['', Validators.required],
      tipoArmazenamento: ['', Validators.required],
      tipoReceita: ['', Validators.required]
    })
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}
