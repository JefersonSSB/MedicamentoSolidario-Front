import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/auth/crypto.service';
import { Pedido } from 'src/app/models/pedido';
import { PedidoUsuarioService } from './pedido-usuario.service';

@Component({
  selector: 'app-pedido-usuario',
  templateUrl: './pedido-usuario.component.html',
  styleUrls: ['./pedido-usuario.component.css'],
  providers: [DatePipe]
})
export class PedidoUsuarioComponent implements OnInit {

  displayedColumns: string[] = ['data', 'ponto', 'donatario', 'cpf', 'opcoes'];
  dataSource = null;
  loading = false;
  id: any;

  pedido: Pedido[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: PedidoUsuarioService,
    private router: Router,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public route: ActivatedRoute,
    public cryptoService: CryptoService
  ) {
    this.dataSource = new MatTableDataSource(this.pedido);
  }

  ngOnInit(): void {
    this.id = this.cryptoService.decrypto(sessionStorage.getItem('id'));
    this.list();
    this.dataSource.paginator = this.paginator;
  }
  list() {
    this.loading = true;
    this.service.listByID(this.id).subscribe(
      (dados) => {
        this.pedido = dados;
        this.dataSource.data = this.pedido;
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

  dataTrasform(date): string {

    return this.datepipe.transform(date, 'dd/MM/yyyy');

  }

}
