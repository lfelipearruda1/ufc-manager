import {
  createIcons,
  BookOpen,
  CalendarDays,
  ChevronRight,
  LayoutList,
  MapPin,
  Scale,
  Trophy,
} from "lucide";

import { fetchEventoDetalhe, fetchProximos } from "../../api/agendaApi";
import type { EventoDetalhe, ProximoEvento } from "../../api/types";
import { formatarDataBr } from "./formatDate";
import { escapeHtml } from "../../utils/escapeHtml";

import "../../styles/global.css";
import "./home.css";

function tipoLabel(tipo: ProximoEvento["tipo"]): string {
  return tipo === "PPV" ? "PPV" : "Fight Night";
}

function template(): string {
  return `
  <div class="shell">
    <header class="topbar">
      <div class="topbar-inner">
        <a href="/" class="brand" aria-current="page">
          <span class="brand-mark" aria-hidden="true"></span>
          <span class="brand-text">UFC Manager</span>
        </a>
        <nav class="nav-main" aria-label="Menu principal">
          <a href="#agenda" class="nav-link is-active">Próximos cards</a>
          <a href="#guia" class="nav-link">Como entender</a>
        </nav>
      </div>
    </header>

    <main id="conteudo">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="hero-inner">
          <p class="hero-eyebrow">Acompanhamento de MMA</p>
          <h1 id="hero-title" class="hero-title">Próximos cards e lutas</h1>
          <p class="hero-sub">
            Veja os eventos agendados na tabela. Clique em uma linha para abrir o card e ver quem enfrenta quem.
          </p>
          <div class="hero-cta">
            <a href="#agenda" class="btn btn-primary">Ver agenda</a>
            <a href="#guia" class="btn btn-ghost">Guia rápido</a>
          </div>
        </div>
      </section>

      <section id="agenda" class="section agenda-section" aria-labelledby="agenda-heading">
        <div class="section-inner section-inner--wide">
          <h2 id="agenda-heading" class="section-title">Próximos cards</h2>
          <p class="section-lead">
            Dados da API em tempo real. Fight Night e PPV com data a partir de hoje.
          </p>

          <p id="agenda-loading" class="agenda-status">Carregando agenda…</p>
          <p id="agenda-error" class="agenda-status agenda-status--error" hidden></p>
          <p id="agenda-empty" class="agenda-status" hidden>Nenhum evento futuro cadastrado. Suba o backend e use os dados de exemplo.</p>

          <div id="agenda-table-wrap" class="agenda-table-wrap" hidden>
            <div class="agenda-table-scroll">
              <table class="agenda-table" aria-describedby="agenda-heading">
                <thead>
                  <tr>
                    <th scope="col">Data</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Evento</th>
                    <th scope="col">Local</th>
                    <th scope="col" class="agenda-th-num">Lutas</th>
                  </tr>
                </thead>
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
            <ol id="detail-lutas" class="fight-list" aria-label="Lutas do evento"></ol>
          </div>
        </div>
      </section>

      <section id="guia" class="section guia-section" aria-labelledby="guia-heading">
        <div class="section-inner">
          <h2 id="guia-heading" class="section-title">Como entender o card</h2>
          <p class="section-lead">
            Três ideias que resolvem a maior parte das dúvidas de quem está começando a acompanhar.
          </p>
          <ul class="guia-grid">
            <li class="guia-card">
              <span class="guia-icon-wrap" aria-hidden="true"><i data-lucide="layout-list"></i></span>
              <h3 class="guia-title">Ordem = importância</h3>
              <p class="guia-text">Na lista de lutas, a ordem <strong>1</strong> é a principal da noite; as demais vão “esquentando” o card.</p>
            </li>
            <li class="guia-card">
              <span class="guia-icon-wrap" aria-hidden="true"><i data-lucide="trophy"></i></span>
              <h3 class="guia-title">Cinturão</h3>
              <p class="guia-text">Quando aparece “cinturão em jogo”, o vencedor pode levar o título da divisão.</p>
            </li>
            <li class="guia-card">
              <span class="guia-icon-wrap" aria-hidden="true"><i data-lucide="scale"></i></span>
              <h3 class="guia-title">Divisão de peso</h3>
              <p class="guia-text">Cada luta mostra a categoria (peso combinado) dos atletas.</p>
            </li>
          </ul>
          <div class="guia-footnote">
            <span class="guia-footnote-icon" aria-hidden="true"><i data-lucide="book-open"></i></span>
            <p>Backend em <code class="inline-code">:8080</code> e front em <code class="inline-code">:5173</code> — CORS já configurado.</p>
          </div>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-footer-inner">
        <p class="footer-copy">UFC Manager — acompanhamento de lutas (projeto acadêmico).</p>
      </div>
    </footer>
  </div>`;
}

function renderLutasDetalhe(d: EventoDetalhe): string {
  return d.lutas
    .map((l) => {
      const belt = l.cinturaoEmJogo
        ? `<span class="fight-tag fight-tag--belt">${escapeHtml(l.tipoCinturao ?? "Cinturão em jogo")}</span>`
        : "";
      return `
      <li class="fight-row ${l.cinturaoEmJogo ? "fight-row--belt" : ""}">
        <div class="fight-order" aria-label="Ordem no card">${l.ordemNoCard}</div>
        <div class="fight-body">
          <div class="fight-names">
            <span class="fighter">${escapeHtml(l.lutadorDesafiante)}</span>
            <span class="fight-vs" aria-hidden="true">vs</span>
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

export function mountHomePage(root: HTMLElement): void {
  root.innerHTML = template();
  createIcons({
    icons: {
      "layout-list": LayoutList,
      trophy: Trophy,
      scale: Scale,
      "book-open": BookOpen,
      "chevron-right": ChevronRight,
    },
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

  function showDetailLoading() {
    if (!detail || !detailTitle || !detailMeta || !detailLutas || !detailErr) return;
    detail.hidden = false;
    detailErr.hidden = true;
    detailTitle.textContent = "Carregando lutas…";
    detailMeta.textContent = "";
    detailLutas.innerHTML = "";
  }

  function showDetail(d: EventoDetalhe) {
    if (!detail || !detailTitle || !detailMeta || !detailLutas || !detailErr) return;
    detail.hidden = false;
    detailErr.hidden = true;
    detailTitle.textContent = d.titulo;
    detailMeta.innerHTML = `
      <span class="event-detail"><i data-lucide="calendar-days"></i><time datetime="${escapeHtml(d.dataEvento)}">${formatarDataBr(d.dataEvento)}</time></span>
      <span class="event-detail"><i data-lucide="map-pin"></i>${escapeHtml(d.cidade)}, ${escapeHtml(d.pais)}</span>
      <span class="event-detail agenda-detail-count">${d.quantLutas} luta(s) no card</span>`;
    detailLutas.innerHTML = renderLutasDetalhe(d);
    createIcons({
      icons: {
        "calendar-days": CalendarDays,
        "map-pin": MapPin,
      },
      root: detail,
    });
  }

  function showDetailError(msg: string) {
    if (!detail || !detailTitle || !detailMeta || !detailLutas || !detailErr) return;
    detail.hidden = false;
    detailErr.textContent = msg;
    detailErr.hidden = false;
    detailTitle.textContent = "Não foi possível carregar";
    detailMeta.textContent = "";
    detailLutas.innerHTML = "";
  }

  fetchProximos()
    .then((rows) => {
      if (loading) loading.hidden = true;
      if (rows.length === 0) {
        if (emptyEl) emptyEl.hidden = false;
        return;
      }
      if (tableWrap) tableWrap.hidden = false;
      if (!tbody) return;
      tbody.innerHTML = rows
        .map((ev) => {
          const pathTipo = ev.tipo === "PPV" ? "ppv" : "card";
          return `<tr class="agenda-row" tabindex="0" role="button" data-tipo="${pathTipo}" data-id="${ev.id}" aria-label="Ver lutas: ${escapeHtml(ev.titulo)}">
            <td><time datetime="${escapeHtml(ev.dataEvento)}">${formatarDataBr(ev.dataEvento)}</time></td>
            <td><span class="agenda-pill agenda-pill--${pathTipo}">${tipoLabel(ev.tipo)}</span></td>
            <td class="agenda-cell-title">${escapeHtml(ev.titulo)}</td>
            <td>${escapeHtml(ev.cidade)}, ${escapeHtml(ev.pais)}</td>
            <td class="agenda-td-num">${ev.quantLutas}</td>
          </tr>`;
        })
        .join("");

      tbody.addEventListener("click", (e) => {
        const tr = (e.target as HTMLElement).closest<HTMLTableRowElement>("tr.agenda-row");
        if (!tr || !tbody.contains(tr)) return;
        const tipo = tr.dataset.tipo as "card" | "ppv" | undefined;
        const id = tr.dataset.id ? Number(tr.dataset.id) : NaN;
        if (!tipo || Number.isNaN(id)) return;
        setSelectedRow(tr);
        showDetailLoading();
        fetchEventoDetalhe(tipo, id)
          .then(showDetail)
          .catch((err: unknown) => {
            showDetailError(err instanceof Error ? err.message : "Erro ao carregar.");
          });
      });

      tbody.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        const tr = (e.target as HTMLElement).closest<HTMLTableRowElement>("tr.agenda-row");
        if (!tr || !tbody.contains(tr)) return;
        e.preventDefault();
        tr.click();
      });
    })
    .catch((e: unknown) => {
      if (loading) loading.hidden = true;
      if (errEl) {
        errEl.hidden = false;
        errEl.textContent =
          e instanceof Error
            ? e.message
            : "Não foi possível carregar a agenda. Verifique se a API está em http://localhost:8080";
      }
    });
}
