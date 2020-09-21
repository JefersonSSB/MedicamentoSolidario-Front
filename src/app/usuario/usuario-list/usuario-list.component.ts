import { PopUpDeleteComponent } from "./../../shared/pop-up-delete/pop-up-delete.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../usuario.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.css"]
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[];
  displayedColumns: string[] = [
    "nome",
    "cpf",
    "email",
    "telefone",
    "nascimento",
    "sexo",
    "role",
    "Opcoes"
  ];
  titulo = "Lista de Usuarios";
  loading = false;

  dataSource = new MatTableDataSource(this.usuarios);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,

    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.list();
    this.dataSource.paginator = this.paginator;
  }
  list() {
    this.loading = true;
    this.usuarioService.list().subscribe(dados => {
      this.usuarios = dados;
      this.dataSource.data = this.usuarios;
      this.loading = false;
    }),
      (error) => { this.showMessage("Ocorreu um erro!", true), this.loading = false };
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEdit(id) {
    this.router.navigate(["usuarioEditar", id]);
  }
  excluir(id) {
    this.loading = true;
    this.usuarioService.remove(id).subscribe(
      success => {
        this.ngOnInit();
        this.loading = false
        console.log("deletado com sucesso!");
        this.showMessage("deletado com sucesso!")


      },
      error => { this.showMessage("Ocorreu um erro!", true), this.loading = false },
      () => console.log("request delete completo")
    );
  }

  openDialog(id) {
    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      width: "350px"
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
      if (result === 1) {
        this.excluir(id);
      }
    });
  }

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: isError ? ['msg-error'] : ['msg-success']

    })
  }
}
