import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { PontoColeta } from 'src/app/models/pontoColeta';
import { PedidoPontoService } from './saida-ponto.service';
import { PontoInfoComponent } from '../../ponto-de-coleta/ponto-info/ponto-info.component';


@Component({
  selector: 'app-saida-ponto',
  templateUrl: './saida-ponto.component.html',
  styleUrls: ['./saida-ponto.component.css']
})
export class SaidaPontoComponent implements OnInit {

  pontos: PontoColeta[];
  displayedColumns: string[] = ['nome', 'cidade', 'bairro', 'cep', 'info', 'opcoes'];
  dataSource = null;
  loading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: PedidoPontoService,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource(this.pontos);
  }

  ngOnInit() {
    this.list();
    this.dataSource.paginator = this.paginator;
  }
  list() {
    this.loading = true;
    this.service.list().subscribe(
      (dados) => {
        this.pontos = dados;
        this.dataSource.data = this.pontos;
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
  Submit(id, nome) {
    this.router.navigate(['pedidoMedicamento', id, nome]);
  }

  openDialog(ponto): void {
    this.dialog.open(PontoInfoComponent, {
      width: '250px',
      data: ponto
    });
  }


}
