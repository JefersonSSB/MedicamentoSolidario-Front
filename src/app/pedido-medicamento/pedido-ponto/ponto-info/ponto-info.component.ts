import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PontoColeta } from 'src/app/models/pontoColeta';

@Component({
  selector: 'app-ponto-info',
  templateUrl: './ponto-info.component.html',
  styleUrls: ['./ponto-info.component.css']
})
export class PontoInfoComponent {

  constructor(

    public dialogRef: MatDialogRef<PontoInfoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PontoColeta) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
