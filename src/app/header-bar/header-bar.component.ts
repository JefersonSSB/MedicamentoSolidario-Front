import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../auth/crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})


export class HeaderBarComponent implements OnInit {

  public menu: HeaderBarComponent


  constructor(private cryptoService: CryptoService,
    private router: Router) {

  }
  ngOnInit() {

    if (sessionStorage.getItem('isAuth') == null) {

      sessionStorage.removeItem("id");
      sessionStorage.removeItem("nome");
      sessionStorage.removeItem("role");
    }
  }

  get nome(): string {
    return this.cryptoService.decrypto(sessionStorage.getItem('nome'))?.split(" ")[0];
  }

  public auth(): boolean {
    return this.cryptoService.decrypto(sessionStorage.getItem('isAuth')) !== "true";
  };

  public authAdm(): boolean {
    return this.cryptoService.decrypto(sessionStorage.getItem('role')) === "ROLE_ADMIN";
  };

  public authVoluntario(): boolean {
    return this.cryptoService.decrypto(sessionStorage.getItem('role')) === "ROLE_INTERMEDIADOR";
  };



  logout() {
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("nome");
    sessionStorage.removeItem("role");
  }
  perfil() {

    this.router.navigate(["usuarioPefil", this.cryptoService.decrypto(sessionStorage.getItem('id'))]);

  }


}
