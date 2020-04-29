import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ListMedicamentoService } from './list-medicamento.service';
import { Medicamento } from '../models/medicamento';
import { MatDialog } from '@angular/material/dialog';
import { SolicitarMedicamentosComponent } from './solicitar-medicamentos/solicitar-medicamentos.component';
import { PontoColetaService } from '../PontoColeta/ponto-coleta.service';
import { PontoColeta } from '../models/pontoColeta';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Pedido } from '../models/pedido';
import { AddMedDialogComponent } from './add-med-dialog/add-med-dialog.component';
import { InfoPontoColetaComponent } from './info-ponto-coleta/info-ponto-coleta.component';


@Component({
  selector: 'app-list-medicamentos',
  templateUrl: './list-medicamentos.component.html',
  styleUrls: ['./list-medicamentos.component.css'],
})
export class ListMedicamentosComponent implements OnInit {



  constructor(
    private listMedicamentosService: ListMedicamentoService,
    private dialog: MatDialog,
    private listPontoDeColeta: PontoColetaService,
    ) { }

    medicamentos :MatTableDataSource<Medicamento>;
    medicamentosParaPedido: Medicamento[] = [];
    medList:Medicamento[]= [];
    displayedColumns:any[];
    totalMedicamentos:number;
    pontosDeColeta:PontoColeta[];
    isLoaded = false;

    @ViewChild(MatSort, {static: true}) sort: MatSort;
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;



    solicitarMedicamentos(){
      this.verPedido();
    }


   // Dialogs Section

    verPedido(): void {
      const dialogRef = this.dialog.open(SolicitarMedicamentosComponent, {
        width: '40%',
        height: '600px',
        data: this.medicamentosParaPedido
      });
    }

    addMedicamento(element): void {
      const dialogRef = this.dialog.open(AddMedDialogComponent, {
        width: '40%',
        height: 'auto',
        data: element,
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
          if(this.medicamentosParaPedido.indexOf(element) === -1) {
            this.medicamentosParaPedido.push(result);
          }
          if(element.qtdPedido ===  0) {
            this.medicamentosParaPedido.splice(this.medicamentosParaPedido.indexOf(result),1);
          }
        }
      });
    }
    // Informações sobre o ponto de coleta do medicamento
    infoPontoColeta(pontoColeta:PontoColeta){
      const dialogRef = this.dialog.open(InfoPontoColetaComponent, {
        width: '40%',
        height: 'auto',
        data: pontoColeta,
      });
    }

    // Obter A lista de midcamentos será dividida em tres etaps Obter Ponto de Coleta Atribuir variaveis e Aplicar filtros
    getPontosDeColeta(){
      this.medList= [];
      this.listPontoDeColeta.list().subscribe(pontosDeColeta => {
        this.getMedicaMentosByPonto(pontosDeColeta);
      });
    }

    getMedicaMentosByPonto(pontosDeColeta:PontoColeta[]){
      this.pontosDeColeta =  pontosDeColeta;
      pontosDeColeta.forEach(pontoDeColeta => {
        this.listMedicamentosService.getMedicamentos(pontoDeColeta.id).subscribe(medicamentos => {
          this.setAtributesMedicamentos(medicamentos, pontoDeColeta);
        })
      });
    }

    setAtributesMedicamentos(medicamentos:Medicamento[], pontoColeta:PontoColeta){
      var itens = 0;
      medicamentos.forEach((medicamento) =>  {
        medicamento.qtdPedido = 0;
        medicamento.pontoDeColeta = pontoColeta;
        this.medList.push(medicamento);
        itens++;
        if(itens === medicamentos.length){
          this.dataForTable(this.medList);
        }
      });
    }

    dataForTable(medList){
      this.medicamentos =  new MatTableDataSource(medList);
      this.medicamentos.sort = this.sort;
      this.medicamentos.paginator = this.paginator;
      this.isLoaded =  true;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.medicamentos.filter = filterValue.trim().toLowerCase();

      if (this.medicamentos.paginator) {
        this.medicamentos.paginator.firstPage();
      }
    }

    ngOnInit(): void {
      if(window.localStorage.getItem('isAuth') === 'false' ){
        history.back();
      } else {
        this.getPontosDeColeta();
        this.displayedColumns = ['nome','add','pontoDeColeta'];
      }
    }

  }
