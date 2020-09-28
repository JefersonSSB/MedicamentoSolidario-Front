import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CryptoService } from 'src/app/auth/crypto.service';
import { Medicamento } from 'src/app/models/medicamento';
import { MedicamentoInfoComponent } from './medicamento-info/medicamento-info.component';
import { MedicamentoQuantidadeComponent } from './medicamento-quantidade/medicamento-quantidade.component';
import { PedidoMedicamentoService } from "./pedido-medicamento.service";
import { PedidoService } from "./pedido.service";

@Component({
  selector: 'app-pedido-medicamento',
  templateUrl: './pedido-medicamento.component.html',
  styleUrls: ['./pedido-medicamento.component.css']
})
export class PedidoMedicamentoComponent implements OnInit {

  justificativa: string;
  idUsuario: any;
  obs: string;
  debugEnable = false;
  public listaMedicamentos: FormArray;
  ponto: string;
  id: any;
  medicamentos: Medicamento[];
  medicamentosList: Medicamento[];
  displayedColumns: string[] = ['nome', 'principio', 'quantidade', 'info', 'opcoes'];
  dataSource = null;
  loading = false;
  public formPedido: FormGroup;
  public formMedicamento: FormGroup;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private route: ActivatedRoute, private service: PedidoMedicamentoService,
    private router: Router,
    private pedidoService: PedidoService,
    public dialog: MatDialog,
    private cryptoService: CryptoService,
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,) {
    this.dataSource = new MatTableDataSource(this.medicamentos);
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.ponto = this.route.snapshot.paramMap.get('nome');
    this.idUsuario = this.cryptoService.decrypto(sessionStorage.getItem('id'));
    this.list();
    this.dataSource.paginator = this.paginator;
    this.medicamentosList = [];
    this.formMedicamento = this.formBuilder.group({
      medicamentoID: ['', Validators.required],
      qtd: ['', Validators.required],
    });

    this.formPedido = this.formBuilder.group({
      idUsuario: [this.id, Validators.required],
      idPonto: [this.idUsuario, Validators.required],
      justificativa: [''],
      listaMedicamentos: this.formBuilder.array(
        [],
        Validators.required
      ),
    });
  }


  get nome(): string {
    return this.cryptoService.decrypto(sessionStorage.getItem('nome'));
  }

  list() {
    this.loading = true;
    this.service.listByID(this.id).subscribe(
      (dados) => {
        this.medicamentos = dados;
        this.dataSource.data = this.medicamentos;
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
  Submit(medicamento: Medicamento) {

    let medicamentoPedido: Medicamento = Object.assign({}, medicamento);

    const dialogQuant = this.dialog.open(MedicamentoQuantidadeComponent, {
      width: '250px',
      data: medicamento
    });

    dialogQuant.afterClosed().subscribe((result) => {

      try {
        if (result > 0 && result <= medicamento.quantidade) {
          console.log(result);

          const index = this.medicamentos.indexOf(medicamento);
          this.medicamentos[index].quantidade = medicamento.quantidade - result;
          this.dataSource.data = this.medicamentos;

          if (this.medicamentosList.some(p => p.id === medicamentoPedido.id)) {

            const i = this.medicamentosList.map(function (e) { return e.id; }).indexOf(medicamentoPedido.id);
            this.medicamentosList[i].quantidade = this.medicamentosList[i].quantidade + result;

          }
          else {
            medicamentoPedido.quantidade = result;
            this.medicamentosList.push(medicamentoPedido);
          }


        }
      } catch (e) {
      }
    });
  }

  openDialog(medicamento) {
    this.dialog.open(MedicamentoInfoComponent, {
      width: '250px',
      data: medicamento
    });

  }
  debug() {
    this.debugEnable = !this.debugEnable;
  }

  showMessage(msg: string, isError: boolean = false): void {
    this._snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: isError ? ['msg-error'] : ['msg-success'],
    });
  }

  salvar() {

    for (var med of this.medicamentosList) {
      this.formMedicamento = this.formBuilder.group({
        medicamentoID: [med.id, Validators.required],
        qtd: [med.quantidade, Validators.required],
      });
      this.listaMedicamentos = this.formPedido.get('listaMedicamentos') as FormArray;
      this.listaMedicamentos.push(this.formMedicamento);
    }

    this.pedidoService.save(this.formPedido.value).subscribe(
      (success) => {
        this.showMessage('Salvo com sucesso!'), this.router.navigate(['/']);
      },
      (error) => { this.showMessage('Erro Desconhecido', true), this.ngOnInit() },
      () => console.log('request completo')
    );

  }


}
