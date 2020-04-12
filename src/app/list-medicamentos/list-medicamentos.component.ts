import { Component, OnInit } from '@angular/core';
import { ListMedicamentoService } from './list-medicamento.service';
import { Medicamento } from '../models/medicamento';
import { MatDialog } from '@angular/material/dialog';
import { SolicitarMedicamentosComponent } from '../solicitar-medicamentos/solicitar-medicamentos.component';

@Component({
  selector: 'app-list-medicamentos',
  templateUrl: './list-medicamentos.component.html',
  styleUrls: ['./list-medicamentos.component.css']
})
export class ListMedicamentosComponent implements OnInit {
  medicamentos = [{nome:'buscopan', quantidade:0, qtdPedido: 0,},{nome:'rivotril', quantidade:0}];
  displayedColumns = ['Nome Medicamento','Quantidade','Ações'];
  totalMedicamentos:number;

  constructor(
    private listMedicamentosService: ListMedicamentoService,
    private dialog: MatDialog
  ) { }

  total(){
    this.totalMedicamentos = 0;
    this.medicamentos.forEach( medicamento => {
      this.totalMedicamentos += medicamento.qtdPedido
    }
    );
  }

  limpar(){
    let i = 0;
    for(i = 0; i < this.medicamentos.length; i++){
      this.medicamentos[i].quantidade = 0;
    }
    this.total();
  }

  solicitarMedicamentos(){
    this.openDialog();
  }

  controller(element:Medicamento, action:string){
    switch(action)
    {
      case '+':
        element.quantidade--;
        element.qtdPedido++;
        break;
      case '-':
        element.quantidade++;
        element.qtdPedido--;
        break
    }
    this.total();
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(SolicitarMedicamentosComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  getMedicamentos(){
    this.listMedicamentosService.getMedicamentos().subscribe( medicamentos =>{
      this.medicamentos = medicamentos;
    },
      err => console.log(err),
      () => console.log('Finish promisse')
    );
  }

  ngOnInit(): void {
    this.getMedicamentos();
    this.total();
  }

}
