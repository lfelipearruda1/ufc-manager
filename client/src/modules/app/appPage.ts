import { fetchDivisoes, fetchLutadores } from "../../api/catalogApi";
import type { Divisao, Lutador } from "../../api/types";
import { escapeHtml } from "../../utils/escapeHtml";

import "../../styles/global.css";
import "../home/home.css";
import "./app.css";

function shellTemplate(): string {
  return `
  <div class="shell">
    <header class="topbar">
      <div class="topbar-inner topbar-inner--wide">
        <a href="#lutadores" class="brand js-nav" data-section="lutadores">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-text">UFC Manager</span>
        </a>
        <nav class="nav-main nav-main--wrap" aria-label="Menu principal">
          <a href="#lutadores" class="nav-link js-nav is-active" data-section="lutadores">Lutadores</a>
          <a href="#divisoes" class="nav-link js-nav" data-section="divisoes">Divisões</a>
        </nav>
      </div>
    </header>

    <main id="conteudo">
      <section id="lutadores" class="layout-section is-visible section data-section">
        <div class="section-inner section-inner--wide">
          <h1 class="page-title">Lutadores</h1>
          <div class="toolbar">
            <label class="field-label">Filtrar por divisão
              <select id="lutadores-filter" class="input-control">
                <option value="">Todas</option>
              </select>
            </label>
            <button type="button" id="lutadores-refresh" class="btn btn-ghost btn-sm">Atualizar</button>
          </div>
          <p id="lutadores-error" class="agenda-status agenda-status--error" hidden></p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr>
                <th>Nome</th><th>Apelido</th><th>Cartel</th><th>Peso (kg)</th><th>Nacionalidade</th><th>Divisão</th>
              </tr></thead>
              <tbody id="lutadores-tbody"><tr><td colspan="6">Carregando…</td></tr></tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="divisoes" class="layout-section section data-section">
        <div class="section-inner section-inner--wide">
          <h1 class="page-title">Divisões</h1>
          <p id="divisoes-error" class="agenda-status agenda-status--error" hidden></p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr>
                <th>Nome</th><th>Peso mín (kg)</th><th>Peso máx (kg)</th><th>ID</th>
              </tr></thead>
              <tbody id="divisoes-tbody"><tr><td colspan="4">Carregando…</td></tr></tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-footer-inner">
        <p class="footer-copy">UFC Manager</p>
      </div>
    </footer>
  </div>`;
}

function showSection(id: string): void {
  document.querySelectorAll(".layout-section").forEach((el) => {
    el.classList.toggle("is-visible", el.id === id);
  });
  document.querySelectorAll(".js-nav").forEach((a) => {
    const sec = (a as HTMLElement).dataset.section;
    a.classList.toggle("is-active", sec === id);
  });
}

function wireNav(): void {
  const go = (id: string) => {
    showSection(id);
    history.replaceState(null, "", `#${id}`);
  };
  document.querySelectorAll(".js-nav").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      const id = (el as HTMLElement).dataset.section;
      if (id) go(id);
    });
  });
  window.addEventListener("hashchange", () => {
    const h = location.hash.slice(1) || "lutadores";
    if (document.getElementById(h)) showSection(h);
  });
  const initial = location.hash.slice(1);
  if (initial && document.getElementById(initial)) showSection(initial);
  else showSection("lutadores");
}

function renderDivisoesTable(rows: Divisao[]): void {
  const tb = document.getElementById("divisoes-tbody");
  if (!tb) return;
  if (rows.length === 0) {
    tb.innerHTML = `<tr><td colspan="4">Nenhuma divisão no banco.</td></tr>`;
    return;
  }
  tb.innerHTML = rows
    .map(
      (d) => `<tr>
      <td>${escapeHtml(d.nomeDivisao)}</td>
      <td>${d.pesoMin}</td>
      <td>${d.pesoMax}</td>
      <td>${d.id}</td>
    </tr>`,
    )
    .join("");
}

function renderLutadoresTable(rows: Lutador[]): void {
  const tb = document.getElementById("lutadores-tbody");
  if (!tb) return;
  if (rows.length === 0) {
    tb.innerHTML = `<tr><td colspan="6">Nenhum lutador neste filtro.</td></tr>`;
    return;
  }
  tb.innerHTML = rows
    .map(
      (l) => `<tr>
      <td>${escapeHtml(l.nome)}</td>
      <td>${escapeHtml(l.apelido)}</td>
      <td>${escapeHtml(l.cartel)}</td>
      <td>${l.peso}</td>
      <td>${escapeHtml(l.nacionalidade)}</td>
      <td>${escapeHtml(l.nomeDivisao)}</td>
    </tr>`,
    )
    .join("");
}

function fillDivisaoFilter(divisoes: Divisao[]): void {
  const filter = document.getElementById("lutadores-filter") as HTMLSelectElement | null;
  if (!filter) return;
  const opts = divisoes
    .map((d) => `<option value="${d.id}">${escapeHtml(d.nomeDivisao)}</option>`)
    .join("");
  filter.innerHTML = `<option value="">Todas</option>${opts}`;
}

export function mountApp(root: HTMLElement): void {
  root.innerHTML = shellTemplate();
  wireNav();

  function loadDivisoes(): void {
    const de = document.getElementById("divisoes-error");
    if (de) de.hidden = true;
    fetchDivisoes()
      .then((divs) => {
        fillDivisaoFilter(divs);
        renderDivisoesTable(divs);
      })
      .catch((e: unknown) => {
        if (de) {
          de.hidden = false;
          de.textContent = e instanceof Error ? e.message : "Erro ao listar divisões.";
        }
      });
  }

  function loadLutadores(): void {
    const sel = document.getElementById("lutadores-filter") as HTMLSelectElement;
    const le = document.getElementById("lutadores-error");
    const raw = sel?.value ?? "";
    let divisaoId: number | undefined;
    if (raw !== "") {
      const n = Number(raw);
      divisaoId = Number.isNaN(n) ? undefined : n;
    }
    if (le) le.hidden = true;
    fetchLutadores(divisaoId)
      .then(renderLutadoresTable)
      .catch((e: unknown) => {
        if (le) {
          le.hidden = false;
          le.textContent = e instanceof Error ? e.message : "Erro ao listar lutadores.";
        }
      });
  }

  loadDivisoes();
  loadLutadores();

  document.getElementById("lutadores-filter")?.addEventListener("change", loadLutadores);
  document.getElementById("lutadores-refresh")?.addEventListener("click", () => {
    loadDivisoes();
    loadLutadores();
  });
}
