export type Divisao = {
  id: number;
  nomeDivisao: string;
  pesoMin: number;
  pesoMax: number;
};
 
export type Lutador = {
  id: number;
  nome: string;
  peso: number;
  apelido: string;
  cartel: string;
  nacionalidade: string;
  idDivisao: number;
  nomeDivisao: string;
};
 