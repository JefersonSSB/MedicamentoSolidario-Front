import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medicamento } from '../models/medicamento';

@Component({
  selector: 'app-solicitar-medicamentos',
  templateUrl: './solicitar-medicamentos.component.html',
  styleUrls: ['./solicitar-medicamentos.component.css']
})
export class SolicitarMedicamentosComponent {
  medicamentos:any[];
  okay =  false;
  displayedColumns = ['nome','quantidade'];
  constructor(
    public dialogRef: MatDialogRef<SolicitarMedicamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
      console.log(this.medicamentos)
      this.medicamentos = this.data;
    }
    onNoClick(): void {
      this.dialogRef.close();
    }
    Oninit(){

    }
}
