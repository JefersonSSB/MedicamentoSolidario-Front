import { MedicamentoService } from './../medicamento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medicamento-form',
  templateUrl: './medicamento-form.component.html',
  styleUrls: ['./medicamento-form.component.css'],
})
export class MedicamentoFormComponent implements OnInit {
  formulario: FormGroup;
  debugEnable = false;
  constructor(
    private formBuilder: FormBuilder,
    private service: MedicamentoService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  titulo = 'Formulario Medicamentos';

  ngOnInit(): void {
    const medicamento = this.route.snapshot.data['medicamento'];
    console.log(medicamento.dataVencimento);
    console.log(medicamento.id);

    this.formulario = this.formBuilder.group({
      dataValidade: [medicamento.dataVencimento],
      id: [medicamento.id],
      idDoacaoIn: [medicamento.idDoacaoIn],
      idDoacaoOut: [medicamento.idDoacaoOut],
      nome: [medicamento.nome, [Validators.required]],
      principio: [medicamento.principio, Validators.required],
      quantidade: [medicamento.quantidade],
      tarja: [medicamento.tarja, Validators.required],
      tipoArmazenamento: [medicamento.tipoArmazenamento, Validators.required],
      tipoReceita: [medicamento.tipoReceita],
    });
  }

  onCancel() {
    this.formulario.reset();
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('submit');
      this.service.save(this.formulario.value).subscribe(
        (success) => {
          this.showMessage('Salvo com sucesso!'),
            this.router.navigate(['/medicamentoLista']);
        },
        (error) => this.showMessage('Ocorreu um erro!', true),
        () => console.log('request completo')
      );
    }
  }

  debug() {
    this.debugEnable = !this.debugEnable;
  }
}
