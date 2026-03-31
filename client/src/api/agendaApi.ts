import { API_BASE } from "../config/api";
import type { EventoDetalhe, ProximoEvento } from "./types";

export async function fetchProximos(): Promise<ProximoEvento[]> {
  const r = await fetch(`${API_BASE}/agenda/proximos`);
  if (!r.ok) throw new Error(`Erro ${r.status}`);
  return r.json() as Promise<ProximoEvento[]>;
}

export async function fetchEventoDetalhe(tipo: "card" | "ppv", id: number): Promise<EventoDetalhe> {
  const r = await fetch(`${API_BASE}/agenda/eventos/${tipo}/${id}`);
  if (r.status === 404) throw new Error("Evento não encontrado.");
  if (!r.ok) throw new Error(`Erro ${r.status}`);
  return r.json() as Promise<EventoDetalhe>;
}
