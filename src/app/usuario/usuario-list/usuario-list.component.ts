import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from '../../models/usuario'
import { UsuarioService } from '../usuario.service'
import {MatPaginator} from '@angular/material/paginator';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})

export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[];
  displayedColumns: string[] = ['id','nome','cpf','email','telefone','nascimento','sexo','role'];

  dataSource = new MatTableDataSource(this.usuarios);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.list();
    this.dataSource.paginator = this.paginator;
  }
  list() {
    this.usuarioService.list().subscribe(dados => {
      this.usuarios = dados;
      this.dataSource.data = this.usuarios;
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
