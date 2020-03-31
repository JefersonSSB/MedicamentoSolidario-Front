import { PopUpDeleteComponent } from "./../../Shared/pop-up-delete/pop-up-delete.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Usuario } from "../../models/usuario";
import { UsuarioService } from "../usuario.service";
import { MatPaginator } from "@angular/material/paginator";
import { Router, ActivatedRoute } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-usuario-list",
  templateUrl: "./usuario-list.component.html",
  styleUrls: ["./usuario-list.component.css"]
})
export class UsuarioListComponent implements OnInit {
  usuarios: Usuario[];
  displayedColumns: string[] = [
    "id",
    "nome",
    "cpf",
    "email",
    "telefone",
    "nascimento",
    "sexo",
    "role",
    "Opcoes"
  ];

  dataSource = new MatTableDataSource(this.usuarios);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

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
  onEdit(id) {
    this.router.navigate(["usuarioEditar", id]);
  }
  excluir(id) {
    this.openDialog(id);
  }

  openDialog(idd) {
    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      width: "350px",
      data: { id: idd }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
      console.log(result);
    });
  }
}
