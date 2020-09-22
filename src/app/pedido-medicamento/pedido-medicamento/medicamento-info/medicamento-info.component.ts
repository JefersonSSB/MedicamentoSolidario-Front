import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medicamento } from 'src/app/models/medicamento';

@Component({
  selector: 'app-medicamento-info',
  templateUrl: './medicamento-info.component.html',
  styleUrls: ['./medicamento-info.component.css']
})
export class MedicamentoInfoComponent {
  constructor(
    public dialogRef: MatDialogRef<MedicamentoInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medicamento) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
