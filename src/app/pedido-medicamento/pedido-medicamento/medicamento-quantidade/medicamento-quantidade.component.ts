import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medicamento } from 'src/app/models/medicamento';

@Component({
  selector: 'app-medicamento-quantidade',
  templateUrl: './medicamento-quantidade.component.html',
  styleUrls: ['./medicamento-quantidade.component.css']
})
export class MedicamentoQuantidadeComponent {

  value: any;
  constructor(
    public dialogRef: MatDialogRef<MedicamentoQuantidadeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medicamento) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
