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
  medicamentos = [{nome:'buscopan', quantidade:0},{nome:'rivotril', quantidade:0}];
  displayedColumns = ['Nome Medicamento','Ações'];
  totalMedicamentos:number;
  constructor(
    private listMedicamentosService: ListMedicamentoService,
    private dialog: MatDialog
  ) { }

  total(){
    this.totalMedicamentos = 0;
    this.medicamentos.forEach( medicamento =>{
      console.log(medicamento)
      this.totalMedicamentos += medicamento.quantidade
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
  openDialog(): void {
    const dialogRef = this.dialog.open(SolicitarMedicamentosComponent, {
      width: '400px',
      data: {name: "this.name", animal: "this.animal"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  getMedicamentos(){
    this.listMedicamentosService.getMedicamentos().subscribe( medicamentos =>
      // this.medicamentos = medicamentos,
      err => console.log(err),
      ()=>console.log(this.medicamentos)
    )
  }
  ngOnInit(): void {
    this.getMedicamentos();
    this.total();
  }

}
