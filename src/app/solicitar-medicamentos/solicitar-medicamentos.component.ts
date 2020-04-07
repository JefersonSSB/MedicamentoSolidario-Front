import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-solicitar-medicamentos',
  templateUrl: './solicitar-medicamentos.component.html',
  styleUrls: ['./solicitar-medicamentos.component.css']
})
export class SolicitarMedicamentosComponent {
  okay =  false;
  constructor(
    public dialogRef: MatDialogRef<SolicitarMedicamentosComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}
    onNoClick(): void {
      this.dialogRef.close();
    }
}
