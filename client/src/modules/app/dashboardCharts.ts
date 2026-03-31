import {
  ArcElement,
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  DoughnutController,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import type { DashboardData } from "../../api/types";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  DoughnutController,
  ArcElement,
);

const muted = "#9aa0a6";
const text = "#e8eaed";
const accent = "#d20a0a";
const gold = "#c9a227";

const chartDefaults = {
  color: text,
  borderColor: "rgba(255,255,255,0.08)",
};

let barChart: Chart | null = null;
let doughnutChart: Chart | null = null;

export function destroyDashboardCharts(): void {
  barChart?.destroy();
  doughnutChart?.destroy();
  barChart = null;
  doughnutChart = null;
}

export function renderDashboardCharts(data: DashboardData): void {
  const barEl = document.getElementById("chart-lutadores-divisao") as HTMLCanvasElement | null;
  const doughEl = document.getElementById("chart-lutas-tipo") as HTMLCanvasElement | null;
  if (!barEl || !doughEl) return;

  destroyDashboardCharts();

  const items = data.lutadoresPorDivisao;
  const labels = items.length > 0 ? items.map((x) => x.nome) : ["(sem dados)"];
  const values = items.length > 0 ? items.map((x) => x.quantidade) : [0];

  barChart = new Chart(barEl, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          label: "Lutadores",
          data: values,
          backgroundColor: values[0] === 0 ? "rgba(255,255,255,0.06)" : accent,
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { titleColor: text, bodyColor: muted },
      },
      scales: {
        x: {
          ticks: { color: muted, maxRotation: 45, minRotation: 0 },
          grid: { color: chartDefaults.borderColor },
        },
        y: {
          beginAtZero: true,
          ticks: { color: muted, stepSize: 1 },
          grid: { color: chartDefaults.borderColor },
        },
      },
    },
  });

  const fn = data.lutasEmFightNight;
  const ppv = data.lutasEmPpv;
  const totalTipo = fn + ppv;

  doughnutChart = new Chart(doughEl, {
    type: "doughnut",
    data: {
      labels: ["Lutas em Fight Night", "Lutas em PPV"],
      datasets: [
        {
          data: totalTipo === 0 ? [1] : [fn, ppv],
          backgroundColor: totalTipo === 0 ? ["rgba(255,255,255,0.08)"] : [accent, gold],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: muted, padding: 16 },
        },
        tooltip: {
          callbacks: {
            label(ctx) {
              if (totalTipo === 0) return " Nenhuma luta cadastrada";
              const v = Number(ctx.raw);
              const pct = totalTipo > 0 ? Math.round((v / totalTipo) * 100) : 0;
              return ` ${v} (${pct}%)`;
            },
          },
        },
      },
    },
  });
}
