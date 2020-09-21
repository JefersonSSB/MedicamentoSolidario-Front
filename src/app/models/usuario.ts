export interface Usuario {
  id: number;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  dataNascimento: Date;
  sexo: string;
  senha: string;
  role: string;
  token?: string;
}
