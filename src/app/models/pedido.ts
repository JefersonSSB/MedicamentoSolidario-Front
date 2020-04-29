import { Medicamento } from './medicamento';

export class Pedido {
  id?: number;
  data: Date;
  idUsauruaio: number;
  medicamentos:Medicamento[];
  justificativa: string;
  recebimentoID: number;
}
