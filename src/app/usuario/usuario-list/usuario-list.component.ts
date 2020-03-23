import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from '../../models/usuario'
import { UsuarioService } from '../usuario.service'

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})

export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[];
  displayedColumns: string[] = ['id','nome','cpf','email','telefone','nascimento','sexo','role'];

  dataSource = new MatTableDataSource(this.usuarios);

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.getUsuario();
  }
  getUsuario() {
    this.usuarioService.getUsuario().subscribe((usuarios: Usuario[]) => {
      this.usuarios = usuarios;
    this.dataSource.data = usuarios;

    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
