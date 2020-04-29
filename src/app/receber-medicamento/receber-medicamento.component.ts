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
import { NgClass } from '@angular/common';
import { PopUpDeleteComponent } from "./../Shared/pop-up-delete/pop-up-delete.component";
import { PontoColetaService } from "./../PontoColeta/ponto-coleta.service";
import { CryptoService } from '../auth/crypto.service';

export interface DialogData {
  dataValidade: string;
  nome: string;
  principio: string;
  quantidade: number;
  tarja: string;
  tipoArmazenamento: string;
  tipoReceita: string;
}

export interface PontoColeta {

  id: number;
  atividadePrincipal: string;
  bairro: string;
  cep: string;
  cidade: string
  cnpj: string;
  complemento: string;
  dataCadastro: string;
  estado: string;
  nome: string;
  numero: string;
  rua: string;

}

@Component({
  selector: "app-receber-medicamento",
  templateUrl: "./receber-medicamento.component.html",
  styleUrls: ["./receber-medicamento.component.css"],
})
export class ReceberMedicamentoComponent implements OnInit {

  public formDoacao: FormGroup;
  pontos: PontoColeta[];
  public medicamentos: FormArray;
  debugEnable = false;
  loading = false;
  solicitante: string;
  voluntario = "Diego Teixeira";

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private receberMedicamentoService: ReceberMedicamentoService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private pontoService: PontoColetaService,
    private cryptoService: CryptoService
  ) { }

  ngOnInit(): void {

    const id = this.route.snapshot.paramMap.get('id');
    const idv = this.cryptoService.decrypto(sessionStorage.getItem('id'))

    if ((id === null) && (idv == null)) {

      this.router.navigate[("/")];
    }



    this.solicitante = this.route.snapshot.paramMap.get('nome');

    this.loading = true;
    this.pontoService.list().subscribe((dados) => {
      this.pontos = dados; this.loading = false;
    }, (error) => { this.loading = false; });


    this.formDoacao = this.formBuilder.group({
      idDoador: [id, Validators.required],
      idPonto: [, Validators.required],
      idVoluntario: [idv, Validators.required],
      obs: ['',],
      medicamentos: this.formBuilder.array([this.medicamento()], Validators.required),
    });
    this.remove(0);
  }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    })
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
      height: '90%',
      panelClass: ['DiagolCss'],
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

  removeElemento(id) {
    const dialogRe = this.dialog.open(PopUpDeleteComponent, {
      width: "350px"
    });

    dialogRe.afterClosed().subscribe(result => {
      if (result === 1) {
        this.remove(id);
      }
    });
  }

  onSubmit() {
    this.medicamentos = this.formDoacao.get('medicamentos') as FormArray;
    if (this.formDoacao.valid && this.medicamentos.length > 0) {
      console.log(JSON.stringify(this.formDoacao.value));
      this.receberMedicamentoService.save(this.formDoacao.value).subscribe(
        success => {
          this.showMessage("Salvo com sucesso!"),
            this.router.navigate(['/']);
        },
        (error) => this.showMessage("Erro Desconhecido", true),
        () => console.log("request completo")
      );
    } else {
      this.showMessage("Form Invalido", true);
    }
  }

  debug() {
    this.debugEnable = !this.debugEnable;
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
