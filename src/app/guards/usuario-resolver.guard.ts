import { UsuarioService } from './../usuario/usuario.service';
import { Usuario } from './../models/usuario';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolverGuard implements Resolve<Usuario> {

  constructor(private service: UsuarioService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    if(route.params && route.params.id){
      return this.service.loadByID(route.params.id);
    }
    return of( {
      id:null,
      nome:null,
      sexo:null,
      senha:null,
      cpf:null,
      email:null,
      telefone:null,
      role:null,
      nascimento:null
    });
  }


}
