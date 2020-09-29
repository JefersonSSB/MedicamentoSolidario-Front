import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { SaidaListaService } from "./saida-lista.service"
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-saida-lista',
  templateUrl: './saida-lista.component.html',
  styleUrls: ['./saida-lista.component.css'],
  providers: [DatePipe]
})
export class SaidaListaComponent implements OnInit {

  displayedColumns: string[] = ['data', 'ponto', 'donatario', 'cpf', 'info', 'opcoes'];
  dataSource = null;
  loading = false;

  pedido: Pedido[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: SaidaListaService,
    private router: Router,
    public dialog: MatDialog,
    public datepipe: DatePipe
  ) {
    this.dataSource = new MatTableDataSource(this.pedido);
  }

  ngOnInit(): void {
    this.list();
    this.dataSource.paginator = this.paginator;
  }
  list() {
    this.loading = true;
    this.service.list().subscribe(
      (dados) => {
        this.pedido = dados;
        this.dataSource.data = this.pedido;
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

  dataTrasform(date): string {

    return this.datepipe.transform(date, 'dd/MM/yyyy');

  }

}
