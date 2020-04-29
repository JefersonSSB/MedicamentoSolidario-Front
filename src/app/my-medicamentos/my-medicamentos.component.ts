import { Component, OnInit } from '@angular/core';
import { CryptoService } from '../auth/crypto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-medicamentos',
  templateUrl: './my-medicamentos.component.html',
  styleUrls: ['./my-medicamentos.component.css']
})
export class MyMedicamentosComponent implements OnInit {

  constructor(
    private cryptoService: CryptoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.cryptoService.decrypto(sessionStorage.getItem('isAuth')) !== 'true') {

      this.router.navigate(["/login"]);
    }
  }

}
