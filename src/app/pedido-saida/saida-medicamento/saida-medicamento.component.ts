import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from 'src/app/models/medicamento';
import { PedidoMedicamentoService } from 'src/app/pedido-medicamento/pedido-medicamento/pedido-medicamento.service';


@Component({
  selector: 'app-saida-medicamento',
  templateUrl: './saida-medicamento.component.html',
  styleUrls: ['./saida-medicamento.component.css']
})
export class SaidaMedicamentoComponent implements OnInit {
  medicamentos: Medicamento[];
  loading = false;
  dataSource = null;
  displayedColumns: string[] = ['nome', 'principio', 'quantidade', 'info'];
  constructor(private service: PedidoMedicamentoService) {
    this.dataSource = new MatTableDataSource(this.medicamentos);
  }

  ngOnInit(): void {
    this.list();
  }
  list() {
    this.loading = true;
    this.service.listByID(2).subscribe(
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
}
