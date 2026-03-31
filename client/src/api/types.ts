export type UltimoEvento = {
  tipo: string;
  id: number;
  cidade: string;
  pais: string;
  dataEvento: string;
};

export type HomeSummary = {
  apiOnline: boolean;
  totalLutadores: number;
  totalCards: number;
  totalCardsPpv: number;
  ultimoEvento: UltimoEvento | null;
};

export type ProximoEvento = {
  tipo: "CARD" | "PPV";
  id: number;
  titulo: string;
  cidade: string;
  pais: string;
  dataEvento: string;
  quantLutas: number;
};

export type LutaLinha = {
  idLuta: number;
  ordemNoCard: number;
  lutadorDesafiante: string;
  lutadorDesafiado: string;
  divisao: string;
  cinturaoEmJogo: boolean;
  tipoCinturao: string | null;
};

export type EventoDetalhe = ProximoEvento & { lutas: LutaLinha[] };

export type NomeQuantidadeItem = { nome: string; quantidade: number };

export type DashboardData = {
  totalLutadores: number;
  totalDivisoes: number;
  totalCards: number;
  totalCardPpv: number;
  totalLutas: number;
  lutasEmFightNight: number;
  lutasEmPpv: number;
  lutadoresPorDivisao: NomeQuantidadeItem[];
};

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
