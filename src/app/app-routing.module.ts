import { PontoColetaInsertComponent } from './PontoColeta/ponto-coleta-insert/ponto-coleta-insert.component';
import { UsuarioInsertComponent } from './usuario/usuario-insert/usuario-insert.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioListComponent } from './usuario/usuario-list/usuario-list.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'usuarioCadastro', component: UsuarioInsertComponent },
  { path: 'usuarioLista', component: UsuarioListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'pontoColetaCadastro', component: PontoColetaInsertComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule]
})
export class AppRoutingModule { }
