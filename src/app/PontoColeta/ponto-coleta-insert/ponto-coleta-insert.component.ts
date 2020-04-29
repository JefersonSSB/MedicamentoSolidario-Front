import { PontoColetaService } from "./../ponto-coleta.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-ponto-coleta-insert",
  templateUrl: "./ponto-coleta-insert.component.html",
  styleUrls: ["./ponto-coleta-insert.component.css"],
})
export class PontoColetaInsertComponent implements OnInit {
  formulario: FormGroup;
  debugEnable = false;

  constructor(
    private formBuilder: FormBuilder,
    private servicePonto: PontoColetaService,
    private route: ActivatedRoute
  ) { }
  titulo = "Cadastro Ponto Coleta";

  ngOnInit(): void {
    const pontoColeta = this.route.snapshot.data["pontoColeta"];

    this.formulario = this.formBuilder.group({
      id: [pontoColeta.id],
      atividadePrincipal: [pontoColeta.atividadePrincipal, Validators.required],
      bairro: [pontoColeta.bairro, Validators.required],
      cep: [pontoColeta.cep, Validators.required],
      cidade: [pontoColeta.cidade, [Validators.required]],
      cnpj: [pontoColeta.cnpj, Validators.required],
      complemento: [pontoColeta.complemento],
      estado: [pontoColeta.estado, Validators.required],
      nome: [pontoColeta.nome, Validators.required],
      numero: [pontoColeta.numero],
      rua: [pontoColeta.rua],
    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      console.log("submit");
      this.servicePonto.save(this.formulario.value).subscribe(
        (success) => console.log("salvo com sucesso!"),
        (error) => console.error(error),
        () => console.log("request completo")
      );
      console.log(this.formulario.value);
    }
  }
  onCancel() {
    this.formulario.reset();
  }

  debug() {
    this.debugEnable = !this.debugEnable;
  }
}
