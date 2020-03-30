import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { Usuario } from '../../models/usuario'
import { UsuarioService } from '../usuario.service'
import {MatPaginator} from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html',
  styleUrls: ['./usuario-list.component.css']
})

export class UsuarioListComponent implements OnInit {

  usuarios: Usuario[];
  displayedColumns: string[] = ['id','nome','cpf','email','telefone','nascimento','sexo','role','Opcoes'];

  dataSource = new MatTableDataSource(this.usuarios);
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute) {}

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
  onEdit(id){
    this.router.navigate(['usuarioEditar', id]);
    //abrirpop-up mostrando cadastro completo passivel de editar

  }
  excluir(){
    //abrirpop-up mostrando cadastro completo com botao de excluir
  }
}
