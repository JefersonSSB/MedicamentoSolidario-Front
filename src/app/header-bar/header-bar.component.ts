import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../auth/crypto.service';

@Component({
  selector: 'app-header-bar',
  templateUrl: './header-bar.component.html',
  styleUrls: ['./header-bar.component.css']
})


export class HeaderBarComponent implements OnInit {

  public menu: HeaderBarComponent


  constructor(private cryptoService: CryptoService) {

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


  logout() {
    sessionStorage.removeItem("isAuth");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("nome");
    sessionStorage.removeItem("role");
  }



}
