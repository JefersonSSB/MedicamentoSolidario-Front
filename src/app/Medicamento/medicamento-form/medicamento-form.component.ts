import { MedicamentoService } from "./../medicamento.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-medicamento-form",
  templateUrl: "./medicamento-form.component.html",
  styleUrls: ["./medicamento-form.component.css"],
})
export class MedicamentoFormComponent implements OnInit {
  formulario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: MedicamentoService,
    private route: ActivatedRoute
  ) {}
  titulo = "Formulario Medicamentos";

  ngOnInit(): void {
    const medicamento = this.route.snapshot.data["medicamento"];

    this.formulario = this.formBuilder.group({
      dataValidade: [medicamento.dataValidade],
      id: [medicamento.id, Validators.required],
      idDoacaoIn: [medicamento.idDoacaoIn, Validators.required],
      idDoacaoOut: [medicamento.idDoacaoOut, Validators.required],
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
  onSubmit() {
    if (this.formulario.valid) {
      console.log("submit");
      this.service.save(this.formulario.value).subscribe(
        (success) => console.log("salvo com sucesso!"),
        (error) => console.error(error),
        () => console.log("request completo")
      );
      console.log(this.formulario.value);
    }
  }
}
