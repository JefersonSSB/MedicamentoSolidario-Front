import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ponto-coleta-insert',
  templateUrl: './ponto-coleta-insert.component.html',
  styleUrls: ['./ponto-coleta-insert.component.css']
})
export class PontoColetaInsertComponent implements OnInit {

  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nomeFantasia: [null],
      cidade: [null]
    });
  }

}
