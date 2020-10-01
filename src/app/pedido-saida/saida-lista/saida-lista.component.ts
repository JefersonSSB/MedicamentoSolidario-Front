import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { SaidaListaService } from "./saida-lista.service"
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-saida-lista',
  templateUrl: './saida-lista.component.html',
  styleUrls: ['./saida-lista.component.css'],
  providers: [DatePipe]
})
export class SaidaListaComponent implements OnInit {

  displayedColumns: string[] = ['data', 'ponto', 'donatario', 'cpf', 'opcoes'];
  dataSource = null;
  loading = false;
  id: any;

  pedido: Pedido[];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: SaidaListaService,
    private router: Router,
    public dialog: MatDialog,
    public datepipe: DatePipe,
    public route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource(this.pedido);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
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
  open() {
    this.router.navigate(['pedidoMedicamento']);
  }

}
