import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})
export class UsuarioPerfilComponent implements OnInit {
  hide = true;

  public formGroup: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public router: Router
  ) { }

  ngOnInit(): void {
    const usuario = this.route.snapshot.data["usuario"];
    this.formGroup = this.formBuilder.group({
      id: [usuario.id],
      nome: [usuario.nome, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      role: [usuario.role, Validators.required],
      sexo: [usuario.sexo, Validators.required],
      telefone: [usuario.telefone, Validators.required],
      dataNascimento: [usuario.dataNascimento, Validators.required],
      senha: [usuario.senha, [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmaSenha: [usuario.senha, Validators.required],
      email: [usuario.email, [Validators.email, Validators.required]],
      confirmaEmail: [usuario.email, [Validators.email, Validators.required]],
    }, { validators: [this.validaSenha] });
  }



  validaSenha(controle: AbstractControl) {
    let senha = controle.get('senha').value;
    let confirmarSenha = controle.get('confirmaSenha').value;

    if (senha === confirmarSenha) {
      controle.get('confirmaSenha').setErrors(null)

    }
    else {
      controle.get('confirmaSenha').setErrors({ 'senhaNull': true });
    }
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(JSON.stringify(this.formGroup.value));
      this.usuarioService.save(this.formGroup.value).subscribe(
        success => {
          this.showMessage("Senha Alterada!"),
            this.formGroup.reset();
        },
        error => this.showMessage("Erro Desconhecido", true),
        () => console.log('request completo')
      );
      console.log(this.formGroup.value);
    }
  }
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']

    })
  }

}
