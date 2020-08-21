import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.css'],
})
export class UsuarioInsertComponent implements OnInit {
  public formGroup: FormGroup;
  debugEnable = false;
  mask = '000.000.000-00';
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public router: Router
  ) {}

  titulo = 'Formulario de Usuários';
  hide = true;
  ngOnInit() {
    const usuario = this.route.snapshot.data['usuario'];

    this.formGroup = this.formBuilder.group(
      {
        id: [usuario.id],
        nome: [usuario.nome, Validators.required],
        cpf: [usuario.cpf, Validators.required],
        role: [usuario.role, Validators.required],
        sexo: [usuario.sexo, Validators.required],
        telefone: [usuario.telefone, Validators.required],
        dataNascimento: [usuario.dataNascimento, Validators.required],
        senha: [
          usuario.senha,
          [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(8),
          ],
        ],
        confirmaSenha: [usuario.senha, Validators.required],
        email: [usuario.email, [Validators.email, Validators.required]],
        confirmaEmail: [usuario.email, [Validators.email, Validators.required]],
      },
      { validators: [this.validaSenha, this.validaEmail] }
    );
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(JSON.stringify(this.formGroup.value));
      this.usuarioService.save(this.formGroup.value).subscribe(
        (success) => {
          this.showMessage('Salvo com sucesso!'), this.router.navigate(['/']);
        },
        (error) => this.showMessage('Erro Desconhecido', true),
        () => console.log('request completo')
      );
      console.log(this.formGroup.value);
    }
  }

  debug() {
    this.debugEnable = !this.debugEnable;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  validaSenha(controle: AbstractControl) {
    const senha = controle.get('senha').value;
    const confirmarSenha = controle.get('confirmaSenha').value;

    if (senha === confirmarSenha) {
      controle.get('confirmaSenha').setErrors(null);
    } else {
      controle.get('confirmaSenha').setErrors({ senhaNull: true });
    }
  }
  validaEmail(controle: AbstractControl) {
    const senha = controle.get('email').value;
    const confirmarSenha = controle.get('confirmaEmail').value;

    if (senha === confirmarSenha) {
      controle.get('confirmaEmail').setErrors(null);
    } else {
      controle.get('confirmaEmail').setErrors({ emailNull: true });
    }
  }
}
