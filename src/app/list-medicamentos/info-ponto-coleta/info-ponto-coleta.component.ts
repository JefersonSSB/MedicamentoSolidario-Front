import { Component, OnInit, Inject } from '@angular/core';
import { PontoColeta } from 'src/app/models/pontoColeta';
import { AddMedDialogComponent } from '../add-med-dialog/add-med-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-info-ponto-coleta',
  templateUrl: './info-ponto-coleta.component.html',
  styleUrls: ['./info-ponto-coleta.component.css']
})
export class InfoPontoColetaComponent implements OnInit {
  pontoColeta:PontoColeta;
  constructor(
    public dialogRef: MatDialogRef<AddMedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data

  ) { }

  ngOnInit(): void {
    this.pontoColeta =  this.data;
  }

}
