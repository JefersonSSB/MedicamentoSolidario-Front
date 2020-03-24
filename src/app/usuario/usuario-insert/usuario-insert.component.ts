import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service'

@Component({
  selector: 'app-usuario-insert',
  templateUrl: './usuario-insert.component.html',
  styleUrls: ['./usuario-insert.component.css'],
})
export class UsuarioInsertComponent implements OnInit {

  public formGroup: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  titulo = 'Cadastro de Usuários';

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      nome:[null,Validators.required],
      cpf: [null,Validators.required],
      role: [null,Validators.required],
      sexo: [null],
      telefone: [null],
      dataNascimento: [null],
      senha: [null,Validators.required],
      email: [null,Validators.email]
    });
  }

  onSubmit() {
      console.log(JSON.stringify(this.formGroup.value));
      this.usuarioService.save(this.formGroup.value).subscribe(data => {console.log(data); });
}
}

