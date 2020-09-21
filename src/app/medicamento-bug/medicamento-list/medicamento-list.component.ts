import { PopUpDeleteComponent } from './../../Shared/pop-up-delete/pop-up-delete.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MedicamentoService } from './../medicamento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Medicamento } from './../../models/medicamento';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-medicamento-list',
  templateUrl: './medicamento-list.component.html',
  styleUrls: ['./medicamento-list.component.css'],
})
export class MedicamentoListComponent implements OnInit {
  displayedColumns = [
    'Nome Medicamento',
    'Principio',
    'Receita',
    'Data de Validade',
    'Quantidade',
    'Ações',
  ];
  medicamentos: Medicamento[];
  dataSource = new MatTableDataSource(this.medicamentos);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  loading = false;
  titulo = 'Lista de Medicamentos';
  constructor(
    private service: MedicamentoService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.list();
    this.dataSource.paginator = this.paginator;
  }
  list() {
    this.loading = true;
    this.service.list().subscribe((dados) => {
      this.medicamentos = dados;
      this.dataSource.data = this.medicamentos;
      this.loading = false;
    }),
      (error) => {
        this.showMessage('Ocorreu um erro!', true), (this.loading = false);
      };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEdit(id) {
    this.router.navigate(['medicamentoEditar', id]);
  }
  excluir(id) {
    this.loading = true;
    this.service.remove(id).subscribe(
      (success) => {
        this.ngOnInit();
        this.loading = false;
        console.log('deletado com sucesso!');
        this.showMessage('deletado com sucesso!');
      },
      (error) => {
        this.showMessage('Ocorreu um erro!', true), (this.loading = false);
      },
      () => console.log('request delete completo')
    );
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      width: '300px',
      height: '200px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result === 1) {
        this.excluir(id);
      }
    });
  }
  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }
}
