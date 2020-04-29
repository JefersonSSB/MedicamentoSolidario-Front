import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medicamento } from 'src/app/models/medicamento';
import { MatTableDataSource } from '@angular/material/table';
import { Pedido } from 'src/app/models/pedido';
import { ListMedicamentoService } from '../list-medicamento.service';


@Component({
  selector: 'app-solicitar-medicamentos',
  templateUrl: './solicitar-medicamentos.component.html',
  styleUrls: ['./solicitar-medicamentos.component.css']
})
export class SolicitarMedicamentosComponent implements OnInit {
  disabled = false;
  medicamentos :MatTableDataSource<Medicamento>;
  okay =  false;
  displayedColumns = ['nome','quantidade','remove'];
  pontosColeta = [];
  constructor(
    public dialogRef: MatDialogRef<SolicitarMedicamentosComponent>,
    private listMedicamentosService: ListMedicamentoService,
    @Inject(MAT_DIALOG_DATA) public data) {
    }


    ngOnInit() {
      console.log(this.medicamentos)
      this.medicamentos =  new MatTableDataSource(this.data);
      this.dialogRef.afterClosed().subscribe(data => {
      if(data !== undefined){
          this.fazPedido(data);
        }
      });
    }

     // -------------------
     fazPedido(medicamentos:Medicamento[]){
      var pedido:Pedido = {
        id: 0,
        data: new Date(),
        idUsuario: parseInt(localStorage.getItem('id'), 10),
        medicamentos,
        justificativa:'',
        recebimentoID: 1,
      }
      this.listMedicamentosService.fazerPedido(pedido).subscribe(data =>{
        console.log(data);

      },err =>{
        console.log('Erro ocorrido');
      });
    }

    remove(element:Medicamento){
      this.medicamentos.data.splice(this.medicamentos.data.indexOf(element),1);
      this.medicamentos._updateChangeSubscription();
      if(this.medicamentos.data.length <= 0){
        this.disabled = true;
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

  }
