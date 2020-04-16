import { Medicamento } from "./medicamento";
export class Doacao {
  data: string;
  id: number;
  idDoador: number;
  idPonto: number;
  idVoluntario: number;
  obs: string;
  medicamentos: Medicamento[];
}
