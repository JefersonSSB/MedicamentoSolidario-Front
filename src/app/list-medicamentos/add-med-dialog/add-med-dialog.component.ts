import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medicamento } from 'src/app/models/medicamento';

export interface Error{
  helpText: string;
  exists:boolean;
}

@Component({
  selector: 'app-add-med-dialog',
  templateUrl: './add-med-dialog.component.html',
  styleUrls: ['./add-med-dialog.component.css']
})
export class AddMedDialogComponent implements OnInit {
  element:any;
  medicamentoParaPedido:Medicamento;
  medicamentoQtd:number;
  disabled = true;
  error:Error= {helpText:null, exists:false};
  constructor(
      public dialogRef: MatDialogRef<AddMedDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data
    ){
      this.element =  this.data;
      this.medicamentoParaPedido = this.element;
    }

  ngOnInit(): void {
  }
  valid(event: KeyboardEvent){
    this.medicamentoQtd =  parseInt((event.target as HTMLInputElement).value,10);
    if(!(this.medicamentoQtd > 0)){
      this.error.exists = true;
      this.error.helpText = 'A quantidade não pode ser igual ou inferior a zero';
      this.disabled = true;
    } else if(this.medicamentoQtd > this.element.quantidade){
      this.error.exists = true;
      this.error.helpText = 'Esta quantidade não pode ser solicitada';
      this.disabled = true;
    }else{
      this.disabled = false;
      this.error.exists = false;
      this.element.qtdPedido = this.medicamentoQtd;
    }
  }

  addMed(){
    if(this.medicamentoParaPedido.qtdPedido < 0){

    } else {
      this.dialogRef.close(this.medicamentoParaPedido);
    }
  }

}
