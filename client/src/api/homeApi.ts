import { API_BASE } from "../config/api";
import type { HomeSummary } from "./types";

export async function fetchHealth(): Promise<Record<string, string>> {
  const r = await fetch(`${API_BASE}/health`);
  if (!r.ok) throw new Error("Servidor indisponível");
  return r.json() as Promise<Record<string, string>>;
}

export async function fetchHomeSummary(): Promise<HomeSummary> {
  const r = await fetch(`${API_BASE}/home/summary`);
  if (!r.ok) throw new Error(`Erro ${r.status}`);
  return r.json() as Promise<HomeSummary>;
}
