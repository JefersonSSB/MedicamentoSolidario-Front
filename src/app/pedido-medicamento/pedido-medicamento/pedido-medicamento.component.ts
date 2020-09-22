import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Medicamento } from 'src/app/models/medicamento';
import { MedicamentoInfoComponent } from './medicamento-info/medicamento-info.component';
import { MedicamentoQuantidadeComponent } from './medicamento-quantidade/medicamento-quantidade.component';
import { PedidoMedicamentoService } from "./pedido-medicamento.service";

@Component({
  selector: 'app-pedido-medicamento',
  templateUrl: './pedido-medicamento.component.html',
  styleUrls: ['./pedido-medicamento.component.css']
})
export class PedidoMedicamentoComponent implements OnInit {

  ponto: string;
  id: any;
  medicamentos: Medicamento[];
  medicamentosList: Medicamento[];
  displayedColumns: string[] = ['nome', 'principio', 'quantidade', 'info', 'opcoes'];
  dataSource = null;
  loading = false;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private route: ActivatedRoute, private service: PedidoMedicamentoService,
    private router: Router,
    public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource(this.medicamentos);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ponto = this.route.snapshot.paramMap.get('nome');
    this.list();
    this.dataSource.paginator = this.paginator;
    this.medicamentosList = [];
  }

  list() {
    this.loading = true;
    this.service.listByID(this.id).subscribe(
      (dados) => {
        this.medicamentos = dados;
        this.dataSource.data = this.medicamentos;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Submit(medicamento: Medicamento) {

    let medicamentoPedido: Medicamento = Object.assign({}, medicamento);

    const dialogQuant = this.dialog.open(MedicamentoQuantidadeComponent, {
      width: '250px',
      data: medicamento
    });

    dialogQuant.afterClosed().subscribe((result) => {

      try {
        if (result > 0 && result <= medicamento.quantidade) {
          console.log(result);

          const index = this.medicamentos.indexOf(medicamento);
          this.medicamentos[index].quantidade = medicamento.quantidade - result;
          this.dataSource.data = this.medicamentos;

          if (this.medicamentosList.some(p => p.id === medicamentoPedido.id)) {

            const i = this.medicamentosList.map(function (e) { return e.id; }).indexOf(medicamentoPedido.id);
            this.medicamentosList[i].quantidade = this.medicamentosList[i].quantidade + result;

          }
          else {
            medicamentoPedido.quantidade = result;
            this.medicamentosList.push(medicamentoPedido);
          }


        }
      } catch (e) {
      }
    });
  }

  openDialog(medicamento) {
    this.dialog.open(MedicamentoInfoComponent, {
      width: '250px',
      data: medicamento
    });

  }

}
