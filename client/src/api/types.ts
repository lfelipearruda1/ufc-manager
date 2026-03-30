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
