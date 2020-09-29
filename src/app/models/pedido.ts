import { Medicamento } from './medicamento';

export class Pedido {
  id?: number;
  dataCriacao: Date;
  idUsuario: number;
  usuarioNome: string;
  usuarioCPF: string;
  pontoNome: string;
  medicamentos: Medicamento[];
  justificativa: string;
  recebimentoID: number;
  status: string;
}
