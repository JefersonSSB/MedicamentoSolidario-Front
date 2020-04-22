import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray } from "@angular/forms";
import { UsuarioService } from "../usuario.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: "app-usuario-insert",
  templateUrl: "./usuario-insert.component.html",
  styleUrls: ["./usuario-insert.component.css"],
})
export class UsuarioInsertComponent implements OnInit {
  public formGroup: FormGroup;
  debugEnable = false;
  mask = '00.000.0000-00'
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    public router: Router
  ) { }

  titulo = "Formulario de Usuários";
  hide = true;
  ngOnInit() {
    const usuario = this.route.snapshot.data["usuario"];

    this.formGroup = this.formBuilder.group({
      id: [usuario.id],
      nome: [usuario.nome, Validators.required],
      cpf: [usuario.cpf, Validators.required],
      role: [usuario.role, Validators.required],
      sexo: [usuario.sexo, Validators.required],
      telefone: [usuario.telefone, Validators.required],
      dataNascimento: [usuario.dataNascimento, Validators.required],
      senha: [usuario.senha, Validators.required],
      email: [usuario.email, Validators.email],
    });
  }

  onSubmit() {
    if (this.formGroup.valid) {
      console.log(JSON.stringify(this.formGroup.value));
      this.usuarioService.save(this.formGroup.value).subscribe(
        success => {
          this.showMessage("Salvo com sucesso!"),
            this.router.navigate(['/']);
        },
        error => this.showMessage("Erro Desconhecido", true),
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
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']

    })
  }
}
