import { createIcons, CalendarDays, ChevronRight, MapPin } from "lucide";

import { fetchDivisoes, fetchLutadores } from "../../api/catalogApi";
import { fetchDashboard } from "../../api/dashboardApi";
import { fetchEventoDetalhe, fetchProximos } from "../../api/agendaApi";
import type { DashboardData, Divisao, EventoDetalhe, Lutador, ProximoEvento } from "../../api/types";
import { formatarDataBr } from "../home/formatDate";
import { renderDashboardCharts } from "./dashboardCharts";
import {
  addFavoriteId,
  getFavoriteIds,
  removeFavoriteId,
} from "./favoritesStorage";
import { escapeHtml } from "../../utils/escapeHtml";

import "../../styles/global.css";
import "../home/home.css";
import "./app.css";

function tipoLabel(tipo: ProximoEvento["tipo"]): string {
  return tipo === "PPV" ? "PPV" : "Fight Night";
}

function renderLutasDetalhe(d: EventoDetalhe): string {
  return d.lutas
    .map((l) => {
      const belt = l.cinturaoEmJogo
        ? `<span class="fight-tag fight-tag--belt">${escapeHtml(l.tipoCinturao ?? "Cinturão em jogo")}</span>`
        : "";
      return `
      <li class="fight-row ${l.cinturaoEmJogo ? "fight-row--belt" : ""}">
        <div class="fight-order">${l.ordemNoCard}</div>
        <div class="fight-body">
          <div class="fight-names">
            <span class="fighter">${escapeHtml(l.lutadorDesafiante)}</span>
            <span class="fight-vs">vs</span>
            <span class="fighter">${escapeHtml(l.lutadorDesafiado)}</span>
          </div>
          <div class="fight-meta">
            <span class="fight-tag fight-tag--muted">${escapeHtml(l.divisao)}</span>
            ${belt}
          </div>
        </div>
      </li>`;
    })
    .join("");
}

function shellTemplate(): string {
  return `
  <div class="shell">
    <header class="topbar">
      <div class="topbar-inner topbar-inner--wide">
        <a href="#painel" class="brand js-nav" data-section="painel">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-text">UFC Manager</span>
        </a>
        <nav class="nav-main nav-main--wrap" aria-label="Menu principal">
          <a href="#painel" class="nav-link js-nav is-active" data-section="painel">Painel</a>
          <a href="#agenda" class="nav-link js-nav" data-section="agenda">Agenda</a>
          <a href="#lutadores" class="nav-link js-nav" data-section="lutadores">Lutadores</a>
          <a href="#divisoes" class="nav-link js-nav" data-section="divisoes">Divisões</a>
          <a href="#favoritos" class="nav-link js-nav" data-section="favoritos">Favoritos</a>
        </nav>
      </div>
    </header>

    <main id="conteudo">
      <section id="painel" class="layout-section is-visible section panel-section">
        <div class="section-inner section-inner--wide">
          <h1 class="page-title">Painel</h1>
          <p class="section-lead section-lead--left">Resumo e gráficos com base nos dados do sistema.</p>
          <p id="panel-error" class="agenda-status agenda-status--error" hidden></p>
          <div id="panel-stats" class="panel-stats" hidden></div>
          <div class="charts-row" id="charts-row" hidden>
            <div class="chart-card">
              <h3 class="chart-title">Lutadores por divisão</h3>
              <div class="chart-canvas-wrap"><canvas id="chart-lutadores-divisao" aria-label="Gráfico de lutadores por divisão"></canvas></div>
            </div>
            <div class="chart-card">
              <h3 class="chart-title">Lutas: Fight Night vs PPV</h3>
              <div class="chart-canvas-wrap"><canvas id="chart-lutas-tipo" aria-label="Gráfico de lutas por tipo de evento"></canvas></div>
            </div>
          </div>
        </div>
      </section>

      <section id="agenda" class="layout-section section agenda-section">
        <div class="section-inner section-inner--wide">
          <h1 class="page-title">Agenda</h1>
          <p class="section-lead section-lead--left">Eventos futuros; clique na linha para ver as lutas.</p>
          <p id="agenda-loading" class="agenda-status">Carregando agenda…</p>
          <p id="agenda-error" class="agenda-status agenda-status--error" hidden></p>
          <p id="agenda-empty" class="agenda-status" hidden>Nenhum evento futuro cadastrado.</p>
          <div id="agenda-table-wrap" class="agenda-table-wrap" hidden>
            <div class="agenda-table-scroll">
              <table class="agenda-table">
                <thead><tr>
                  <th>Data</th><th>Tipo</th><th>Evento</th><th>Local</th><th class="agenda-th-num">Lutas</th>
                </tr></thead>
                <tbody id="agenda-tbody"></tbody>
              </table>
            </div>
            <p class="agenda-hint"><i data-lucide="chevron-right" class="agenda-hint-icon"></i> Clique na linha para ver as lutas.</p>
          </div>
          <div id="agenda-detail" class="agenda-detail" hidden>
            <div class="agenda-detail-head">
              <h3 id="detail-title" class="agenda-detail-title"></h3>
              <p id="detail-meta" class="agenda-detail-meta"></p>
            </div>
            <p id="detail-error" class="agenda-status agenda-status--error" hidden></p>
            <ol id="detail-lutas" class="fight-list"></ol>
          </div>
        </div>
      </section>

      <section id="lutadores" class="layout-section section data-section">
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
                <th>Nome</th><th>Apelido</th><th>Cartel</th><th>Peso</th><th>Nacionalidade</th><th>Divisão</th>
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
              <thead><tr><th>Nome</th><th>Peso min (kg)</th><th>Peso max (kg)</th><th>ID</th></tr></thead>
              <tbody id="divisoes-tbody"><tr><td colspan="4">Carregando…</td></tr></tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="favoritos" class="layout-section section favoritos-section">
        <div class="section-inner section-inner--wide">
          <h1 class="page-title">Lutadores favoritos</h1>
          <p class="section-lead section-lead--left">Escolha lutadores que já existem no cadastro do sistema. A lista fica salva neste navegador.</p>
          <div class="toolbar">
            <label class="field-label">Lutador
              <select id="fav-select" class="input-control" aria-label="Selecionar lutador para favoritar">
                <option value="">Carregando…</option>
              </select>
            </label>
            <button type="button" id="fav-add" class="btn btn-primary btn-sm">Adicionar</button>
            <button type="button" id="fav-refresh" class="btn btn-ghost btn-sm">Atualizar lista</button>
          </div>
          <p id="fav-msg" class="agenda-status" hidden></p>
          <p id="fav-error" class="agenda-status agenda-status--error" hidden></p>
          <div class="table-scroll">
            <table class="data-table">
              <thead><tr>
                <th>Nome</th><th>Apelido</th><th>Divisão</th><th>Cartel</th><th></th>
              </tr></thead>
              <tbody id="fav-tbody"><tr><td colspan="5">Carregando…</td></tr></tbody>
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
    const h = location.hash.slice(1) || "painel";
    if (document.getElementById(h)) showSection(h);
  });
  const initial = location.hash.slice(1);
  if (initial && document.getElementById(initial)) showSection(initial);
  else showSection("painel");
}

function renderPanelStats(d: DashboardData): void {
  const el = document.getElementById("panel-stats");
  if (!el) return;
  el.innerHTML = `
    <article class="panel-stat"><span class="panel-stat-value">${d.totalLutadores}</span><span class="panel-stat-label">Lutadores</span></article>
    <article class="panel-stat"><span class="panel-stat-value">${d.totalDivisoes}</span><span class="panel-stat-label">Divisões</span></article>
    <article class="panel-stat"><span class="panel-stat-value">${d.totalCards}</span><span class="panel-stat-label">Fight Nights</span></article>
    <article class="panel-stat"><span class="panel-stat-value">${d.totalCardPpv}</span><span class="panel-stat-label">PPVs</span></article>
    <article class="panel-stat panel-stat--accent"><span class="panel-stat-value">${d.totalLutas}</span><span class="panel-stat-label">Lutas (total)</span></article>
  `;
  el.hidden = false;
  const row = document.getElementById("charts-row");
  if (row) row.hidden = false;
}

function fillDivisaoSelects(divisoes: Divisao[]): void {
  const filter = document.getElementById("lutadores-filter") as HTMLSelectElement | null;
  const opts = divisoes
    .map((d) => `<option value="${d.id}">${escapeHtml(d.nomeDivisao)}</option>`)
    .join("");
  if (filter) {
    filter.innerHTML = `<option value="">Todas</option>${opts}`;
  }
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

function renderFavoritesTable(all: Lutador[]): void {
  const tb = document.getElementById("fav-tbody");
  if (!tb) return;
  const ids = getFavoriteIds();
  const byId = new Map(all.map((l) => [l.id, l]));
  if (ids.length === 0) {
    tb.innerHTML = `<tr><td colspan="5">Nenhum favorito ainda. Escolha um lutador acima e clique em Adicionar.</td></tr>`;
    return;
  }
  tb.innerHTML = ids
    .map((id) => {
      const l = byId.get(id);
      if (!l) {
        return `<tr class="fav-row--orphan">
          <td colspan="4">Lutador #${id} não encontrado (pode ter sido removido do banco).</td>
          <td><button type="button" class="btn btn-ghost btn-sm fav-remove" data-id="${id}">Remover</button></td>
        </tr>`;
      }
      return `<tr>
        <td>${escapeHtml(l.nome)}</td>
        <td>${escapeHtml(l.apelido)}</td>
        <td>${escapeHtml(l.nomeDivisao)}</td>
        <td>${escapeHtml(l.cartel)}</td>
        <td><button type="button" class="btn btn-ghost btn-sm fav-remove" data-id="${id}" aria-label="Remover ${escapeHtml(l.nome)} dos favoritos">Remover</button></td>
      </tr>`;
    })
    .join("");
}

function fillFavoriteSelect(all: Lutador[]): void {
  const sel = document.getElementById("fav-select") as HTMLSelectElement | null;
  if (!sel) return;
  const sorted = [...all].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
  sel.innerHTML =
    `<option value="">Selecione um lutador…</option>` +
    sorted.map((l) => `<option value="${l.id}">${escapeHtml(l.nome)} — ${escapeHtml(l.apelido)}</option>`).join("");
}

export function mountApp(root: HTMLElement): void {
  root.innerHTML = shellTemplate();
  createIcons({
    icons: {
      "chevron-right": ChevronRight,
    },
  });

  wireNav();

  const panelErr = document.getElementById("panel-error");
  fetchDashboard()
    .then((d) => {
      renderPanelStats(d);
      renderDashboardCharts(d);
      if (panelErr) panelErr.hidden = true;
    })
    .catch((e: unknown) => {
      if (panelErr) {
        panelErr.hidden = false;
        panelErr.textContent = e instanceof Error ? e.message : "Falha ao carregar painel.";
      }
    });

  function reloadCatalog(): Promise<Divisao[]> {
    return fetchDivisoes().then((divs) => {
      fillDivisaoSelects(divs);
      renderDivisoesTable(divs);
      const de = document.getElementById("divisoes-error");
      if (de) de.hidden = true;
      return divs;
    });
  }

  function loadFavoritesSection(): void {
    const fe = document.getElementById("fav-error");
    const fm = document.getElementById("fav-msg");
    if (fm) {
      fm.hidden = true;
      fm.textContent = "";
    }
    if (fe) fe.hidden = true;
    fetchLutadores()
      .then((all) => {
        fillFavoriteSelect(all);
        renderFavoritesTable(all);
      })
      .catch((e: unknown) => {
        if (fe) {
          fe.hidden = false;
          fe.textContent = e instanceof Error ? e.message : "Erro ao carregar lutadores.";
        }
        const tb = document.getElementById("fav-tbody");
        if (tb) tb.innerHTML = `<tr><td colspan="5">—</td></tr>`;
      });
  }

  reloadCatalog().catch((e: unknown) => {
    const de = document.getElementById("divisoes-error");
    if (de) {
      de.hidden = false;
      de.textContent = e instanceof Error ? e.message : "Erro ao listar divisões.";
    }
  });

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
          le.textContent = e instanceof Error ? e.message : "Erro.";
        }
      });
  }

  loadLutadores();
  loadFavoritesSection();

  document.getElementById("lutadores-filter")?.addEventListener("change", loadLutadores);
  document.getElementById("lutadores-refresh")?.addEventListener("click", () => {
    reloadCatalog()
      .then(() => {
        loadLutadores();
        loadFavoritesSection();
      })
      .catch(() => {});
  });

  document.getElementById("fav-add")?.addEventListener("click", () => {
    const sel = document.getElementById("fav-select") as HTMLSelectElement;
    const fm = document.getElementById("fav-msg");
    const fe = document.getElementById("fav-error");
    if (fe) fe.hidden = true;
    const raw = sel?.value ?? "";
    if (raw === "") {
      if (fm) {
        fm.hidden = false;
        fm.textContent = "Selecione um lutador na lista.";
      }
      return;
    }
    const id = Number(raw);
    if (Number.isNaN(id)) return;
    const added = addFavoriteId(id);
    if (fm) {
      fm.hidden = false;
      fm.textContent = added ? "Adicionado aos favoritos." : "Esse lutador já está nos favoritos.";
    }
    fetchLutadores().then((all) => {
      renderFavoritesTable(all);
    });
  });

  document.getElementById("fav-refresh")?.addEventListener("click", () => loadFavoritesSection());

  document.getElementById("fav-tbody")?.addEventListener("click", (e) => {
    const btn = (e.target as HTMLElement).closest("button.fav-remove") as HTMLButtonElement | null;
    if (!btn) return;
    const id = Number(btn.dataset.id);
    if (Number.isNaN(id)) return;
    removeFavoriteId(id);
    fetchLutadores().then((all) => renderFavoritesTable(all));
  });

  const loading = document.querySelector<HTMLParagraphElement>("#agenda-loading");
  const errEl = document.querySelector<HTMLParagraphElement>("#agenda-error");
  const emptyEl = document.querySelector<HTMLParagraphElement>("#agenda-empty");
  const tableWrap = document.querySelector<HTMLDivElement>("#agenda-table-wrap");
  const tbody = document.querySelector<HTMLTableSectionElement>("#agenda-tbody");
  const detail = document.querySelector<HTMLDivElement>("#agenda-detail");
  const detailTitle = document.querySelector<HTMLHeadingElement>("#detail-title");
  const detailMeta = document.querySelector<HTMLParagraphElement>("#detail-meta");
  const detailLutas = document.querySelector<HTMLOListElement>("#detail-lutas");
  const detailErr = document.querySelector<HTMLParagraphElement>("#detail-error");

  function setSelectedRow(tr: HTMLTableRowElement | null) {
    tbody?.querySelectorAll("tr").forEach((row) => row.classList.remove("is-selected"));
    tr?.classList.add("is-selected");
  }

  function showDetail(d: EventoDetalhe) {
    if (!detail || !detailTitle || !detailMeta || !detailLutas || !detailErr) return;
    detail.hidden = false;
    detailErr.hidden = true;
    detailTitle.textContent = d.titulo;
    detailMeta.innerHTML = `
      <span class="event-detail"><i data-lucide="calendar-days"></i><time datetime="${escapeHtml(d.dataEvento)}">${formatarDataBr(d.dataEvento)}</time></span>
      <span class="event-detail"><i data-lucide="map-pin"></i>${escapeHtml(d.cidade)}, ${escapeHtml(d.pais)}</span>
      <span class="event-detail agenda-detail-count">${d.quantLutas} luta(s)</span>`;
    detailLutas.innerHTML = renderLutasDetalhe(d);
    createIcons({ icons: { "calendar-days": CalendarDays, "map-pin": MapPin }, root: detail });
  }

  function refreshAgenda(): void {
    fetchProximos()
      .then((rows) => {
        if (loading) loading.hidden = true;
        if (rows.length === 0) {
          if (emptyEl) emptyEl.hidden = false;
          if (tableWrap) tableWrap.hidden = true;
          return;
        }
        if (emptyEl) emptyEl.hidden = true;
        if (tableWrap) tableWrap.hidden = false;
        if (!tbody) return;
        tbody.innerHTML = rows
          .map((ev) => {
            const pathTipo = ev.tipo === "PPV" ? "ppv" : "card";
            return `<tr class="agenda-row" tabindex="0" role="button" data-tipo="${pathTipo}" data-id="${ev.id}">
            <td><time datetime="${escapeHtml(ev.dataEvento)}">${formatarDataBr(ev.dataEvento)}</time></td>
            <td><span class="agenda-pill agenda-pill--${pathTipo}">${tipoLabel(ev.tipo)}</span></td>
            <td class="agenda-cell-title">${escapeHtml(ev.titulo)}</td>
            <td>${escapeHtml(ev.cidade)}, ${escapeHtml(ev.pais)}</td>
            <td class="agenda-td-num">${ev.quantLutas}</td>
          </tr>`;
          })
          .join("");
      })
      .catch((e: unknown) => {
        if (loading) loading.hidden = true;
        if (errEl) {
          errEl.hidden = false;
          errEl.textContent = e instanceof Error ? e.message : "Erro na agenda.";
        }
      });
  }

  refreshAgenda();

  tbody?.addEventListener("click", (e) => {
    const tr = (e.target as HTMLElement).closest<HTMLTableRowElement>("tr.agenda-row");
    if (!tr || !tbody.contains(tr)) return;
    const tipo = tr.dataset.tipo as "card" | "ppv" | undefined;
    const id = tr.dataset.id ? Number(tr.dataset.id) : NaN;
    if (!tipo || Number.isNaN(id)) return;
    setSelectedRow(tr);
    if (detailTitle) detailTitle.textContent = "Carregando…";
    if (detail) detail.hidden = false;
    fetchEventoDetalhe(tipo, id)
      .then(showDetail)
      .catch((err: unknown) => {
        if (detailErr) {
          detailErr.hidden = false;
          detailErr.textContent = err instanceof Error ? err.message : "Erro.";
        }
      });
  });

  tbody?.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const tr = (e.target as HTMLElement).closest<HTMLTableRowElement>("tr.agenda-row");
    if (!tr || !tbody?.contains(tr)) return;
    e.preventDefault();
    tr.click();
  });
}
