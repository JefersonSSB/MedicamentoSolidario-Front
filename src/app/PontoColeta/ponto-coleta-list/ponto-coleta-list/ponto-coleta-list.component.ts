import { PontoColeta } from './../../../models/pontoColeta';
import { PontoColetaService } from './../../ponto-coleta.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-ponto-coleta-list',
  templateUrl: './ponto-coleta-list.component.html',
  styleUrls: ['./ponto-coleta-list.component.css']
})
export class PontoColetaListComponent implements OnInit {
  constructor(private service: PontoColetaService) { }
  displayedColumns: string[] = ['nome', 'cnpj','atividadePrincipal','cidade'];
  pontosColetas: PontoColeta[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  dataSource = new MatTableDataSource<PontoColeta>(this.pontosColetas);

  ngOnInit(): void {
    this.service.list().subscribe(
      dados => this.pontosColetas = dados,
      err => console.log(err),
      );
      this.dataSource.paginator = this.paginator;
    }

  }
