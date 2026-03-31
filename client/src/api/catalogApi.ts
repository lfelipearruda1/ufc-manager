import { API_BASE } from "../config/api";
import type { Divisao, Lutador } from "./types";

export async function fetchDivisoes(): Promise<Divisao[]> {
  const r = await fetch(`${API_BASE}/divisoes`);
  if (!r.ok) throw new Error(`Divisões: erro ${r.status}`);
  return r.json() as Promise<Divisao[]>;
}

export async function createDivisao(body: {
  nomeDivisao: string;
  pesoMin: number;
  pesoMax: number;
}): Promise<Divisao> {
  const r = await fetch(`${API_BASE}/divisoes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const j = (await r.json().catch(() => ({}))) as { message?: string };
    throw new Error(j.message ?? `Erro ${r.status}`);
  }
  return r.json() as Promise<Divisao>;
}

export async function fetchLutadores(divisaoId?: number): Promise<Lutador[]> {
  const q = divisaoId != null ? `?divisaoId=${divisaoId}` : "";
  const r = await fetch(`${API_BASE}/lutadores${q}`);
  if (!r.ok) throw new Error(`Lutadores: erro ${r.status}`);
  return r.json() as Promise<Lutador[]>;
}

export async function createLutador(body: {
  nome: string;
  peso: number;
  apelido: string;
  cartel: string;
  nacionalidade: string;
  idDivisao: number;
}): Promise<Lutador> {
  const r = await fetch(`${API_BASE}/lutadores`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const j = (await r.json().catch(() => ({}))) as { message?: string };
    throw new Error(j.message ?? `Erro ${r.status}`);
  }
  return r.json() as Promise<Lutador>;
}

export async function createFightNight(body: {
  cidade: string;
  pais: string;
  dataEvento: string;
  quantLutas: number;
}): Promise<{ idCard: number; tipo: string }> {
  const r = await fetch(`${API_BASE}/eventos/fight-night`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const j = (await r.json().catch(() => ({}))) as { message?: string };
    throw new Error(j.message ?? `Erro ${r.status}`);
  }
  return r.json() as Promise<{ idCard: number; tipo: string }>;
}

export async function createPpv(body: {
  numEdicao: number;
  precoPpv: number;
  receitaTotal: number;
  quantPagantes: number;
  cidade: string;
  pais: string;
  dataEvento: string;
  quantLutas: number;
}): Promise<{ idCardPpv: number; tipo: string }> {
  const r = await fetch(`${API_BASE}/eventos/ppv`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) {
    const j = (await r.json().catch(() => ({}))) as { message?: string };
    throw new Error(j.message ?? `Erro ${r.status}`);
  }
  return r.json() as Promise<{ idCardPpv: number; tipo: string }>;
}
