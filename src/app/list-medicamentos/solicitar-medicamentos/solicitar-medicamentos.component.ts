import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PontoColetaService } from 'src/app/PontoColeta/ponto-coleta.service';
import { PontoColeta } from 'src/app/models/pontoColeta';
import { Medicamento } from 'src/app/models/medicamento';


@Component({
  selector: 'app-solicitar-medicamentos',
  templateUrl: './solicitar-medicamentos.component.html',
  styleUrls: ['./solicitar-medicamentos.component.css']
})
export class SolicitarMedicamentosComponent implements OnInit {
  medicamentos:Medicamento[];
  okay =  false;
  displayedColumns = ['nome','quantidade'];
  pontosColeta = [];
  constructor(
    public dialogRef: MatDialogRef<SolicitarMedicamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(this.medicamentos)
      this.medicamentos = this.data;
    }


    ngOnInit() {

    }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
