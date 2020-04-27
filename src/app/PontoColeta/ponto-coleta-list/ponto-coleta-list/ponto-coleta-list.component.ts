import { PopUpDeleteComponent } from "./../../../Shared/pop-up-delete/pop-up-delete.component";
import { Router } from "@angular/router";
import { PontoColeta } from "./../../../models/pontoColeta";
import { PontoColetaService } from "./../../ponto-coleta.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: "app-ponto-coleta-list",
  templateUrl: "./ponto-coleta-list.component.html",
  styleUrls: ["./ponto-coleta-list.component.css"],
})
export class PontoColetaListComponent implements OnInit {
  pontos: PontoColeta[];
  displayedColumns: string[] = ["nome", "cidade", "bairro", "cep", "opcoes"];
  dataSource = new MatTableDataSource(this.pontos);
  loading = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    private service: PontoColetaService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.list();
    this.dataSource.paginator = this.paginator;
  }
  list() {
    this.loading = true;
    this.service.list().subscribe((dados) => {
      this.pontos = dados;
      this.dataSource.data = this.pontos;
      this.loading = false;
    },
      (error) => { this.loading = false; }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onEdit(id) {
    this.router.navigate(["pontoColetaEditar", id]);
  }
  excluir(id) {
    this.service.remove(id).subscribe(
      (success) => {
        console.log("deletado com sucesso!");
      },
      (error) => console.error(error),
      () => console.log("request delete completo")
    );
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(PopUpDeleteComponent, {
      width: "350px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log("The dialog was closed");
      console.log(result);
      if (result === 1) {
        this.excluir(id);
      }
    });
  }
}
