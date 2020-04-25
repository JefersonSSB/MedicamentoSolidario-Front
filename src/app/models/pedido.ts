import { Medicamento } from './medicamento';

export class Pedido {
  id: number;
  data: Date;
  idUsuario: number;
  medicamentos:Medicamento[];
  justificativa: string;
  recebimentoID: number;
}
