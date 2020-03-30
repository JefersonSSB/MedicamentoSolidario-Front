import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioService } from "../usuario.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-usuario-insert",
  templateUrl: "./usuario-insert.component.html",
  styleUrls: ["./usuario-insert.component.css"]
})
export class UsuarioInsertComponent implements OnInit {
  public formGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute
  ) {}

  titulo = 'Formulario de Usuários';

  ngOnInit() {
    const usuario = this.route.snapshot.data['usuario'];

    this.formGroup = this.formBuilder.group({
      id:[usuario.id],
      nome: [usuario.id, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      role: [usuario.role, Validators.required],
      sexo: [usuario.sexo],
      telefone: [usuario.telefone],
      dataNascimento: [usuario.dataNascimento],
      senha: [usuario.senha, Validators.required],
      email: [usuario.email, Validators.email]
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(JSON.stringify(this.formGroup.value));
        this.usuarioService.save(this.formGroup.value).subscribe(
          success => console.log("salvo com sucesso!"),
          error => console.error(error),
          () => console.log("request completo")
        );      console.log(this.formGroup.value);
    }
  }
}
