import { API_BASE } from "../config/api";
import type { DashboardData } from "./types";

export async function fetchDashboard(): Promise<DashboardData> {
  const r = await fetch(`${API_BASE}/dashboard`);
  if (!r.ok) throw new Error(`Dashboard: erro ${r.status}`);
  return r.json() as Promise<DashboardData>;
}
