import { Component, OnInit, ViewChild } from '@angular/core';
import { ListMedicamentoService } from './list-medicamento.service';
import { Medicamento } from '../models/medicamento';
import { MatDialog } from '@angular/material/dialog';
import { SolicitarMedicamentosComponent } from '../solicitar-medicamentos/solicitar-medicamentos.component';
import { PontoColetaService } from '../PontoColeta/ponto-coleta.service';
import { PontoColeta } from '../models/pontoColeta';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Pedido } from '../models/pedido';


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
      this.openDialog();
    }

    controller(element:Medicamento, action:string){
      switch(action)
      {
        case '+':
        element.quantidade--;
        element.qtdPedido++;
        if(this.medicamentosParaPedido.indexOf(element) === -1) {
          this.medicamentosParaPedido.push(element);
        }
        break;
        case '-':
        element.quantidade++;
        element.qtdPedido--;
        if(element.qtdPedido ===  0) {
          this.medicamentosParaPedido.splice(this.medicamentosParaPedido.indexOf(element),1);
        }
        break
      }
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(SolicitarMedicamentosComponent, {
        width: '40%',
        height: '600px',
        data: this.medicamentosParaPedido
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result !== undefined){
          this.fazPedido(result);
        }
      });
    }

    fazPedido(medicamentos:Medicamento[]){
      var pedido:Pedido = {
        id: 0,
        data: new Date(),
        idUsauruaio: parseInt(localStorage.getItem('id'), 10),
        medicamentos,
        justificativa:'aaa',
        recebimentoID: 1,
      }
      this.listMedicamentosService.fazerPedido(pedido).subscribe(result =>{
        this.getPontosDeColeta();
      },err =>{
        console.log(err.error.message);
      });
    }
    // Obter A lista de midcamentos será dividida em tres etaps Obter Ponto de Coleta Atribuir variaveis e Aplicar filtros
    getPontosDeColeta(){
      this.listPontoDeColeta.list().subscribe(pontosDeColeta => {
        this.getMedicaMentosByPonto(pontosDeColeta);
      });
    }
    getMedicaMentosByPonto(pontosDeColeta:PontoColeta[]){
      this.pontosDeColeta =  pontosDeColeta;
      pontosDeColeta.forEach(pontoDeColeta => {
        this.listMedicamentosService.getMedicamentos(pontoDeColeta.id).subscribe(medicamentos => {
          this.setAtributesMedicamentos(medicamentos, pontoDeColeta.nome);
        })
      });
    }
    setAtributesMedicamentos(medicamentos:Medicamento[], pontoColeta:string){
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
        this.displayedColumns = ['nome','quantidade','estoque','pontoDeColeta'];
      }
    }

  }
