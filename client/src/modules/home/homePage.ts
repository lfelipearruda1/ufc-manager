import {
  createIcons,
  CalendarDays,
  LayoutGrid,
  Scale,
  Swords,
  Trophy,
  Tv,
  Users,
} from "lucide";

import { fetchHealth, fetchHomeSummary } from "../../api/homeApi";
import { formatarDataBr } from "./formatDate";

import "../../styles/global.css";
import "./home.css";

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
          <a href="#conteudo" class="nav-link is-active">Início</a>
          <a href="#explorar" class="nav-link">Explorar</a>
          <span class="nav-link nav-link--soon" title="Em breve">Lutadores</span>
          <span class="nav-link nav-link--soon" title="Em breve">Eventos</span>
          <span class="nav-link nav-link--soon" title="Em breve">Divisões</span>
        </nav>
        <span id="conn-badge" class="conn-badge" aria-live="polite">…</span>
      </div>
    </header>

    <main id="conteudo">
      <section class="hero" aria-labelledby="hero-title">
        <div class="hero-bg" aria-hidden="true"></div>
        <div class="hero-inner">
          <p class="hero-eyebrow">Seu acompanhamento de MMA</p>
          <h1 id="hero-title" class="hero-title">Lutas, atletas e eventos na mesma arena</h1>
          <p class="hero-sub">
            Cadastre e consulte lutadores, cards, eventos PPV e divisões de peso — integrado à API do projeto.
          </p>
          <div class="hero-cta">
            <a href="#numeros" class="btn btn-primary">Ver números ao vivo</a>
            <a href="#explorar" class="btn btn-ghost">Como funciona</a>
          </div>
        </div>
      </section>

      <section id="numeros" class="section stats-section" aria-labelledby="stats-heading">
        <div class="section-inner">
          <h2 id="stats-heading" class="section-title">Painel rápido</h2>
          <p class="section-lead">Dados em tempo real do banco (via API).</p>
          <div id="stats-grid" class="stats-grid" role="region" aria-live="polite">
            <article class="stat-card">
              <span class="stat-icon-wrap" aria-hidden="true"><i data-lucide="users"></i></span>
              <span class="stat-value" id="stat-lutadores">—</span>
              <span class="stat-label">Lutadores</span>
            </article>
            <article class="stat-card">
              <span class="stat-icon-wrap" aria-hidden="true"><i data-lucide="layout-grid"></i></span>
              <span class="stat-value" id="stat-cards">—</span>
              <span class="stat-label">Events Card</span>
            </article>
            <article class="stat-card stat-card--accent">
              <span class="stat-icon-wrap" aria-hidden="true"><i data-lucide="tv"></i></span>
              <span class="stat-value" id="stat-ppv">—</span>
              <span class="stat-label">Events PPV</span>
            </article>
          </div>
          <div id="ultimo-evento" class="ultimo-evento" hidden>
            <h3 class="ultimo-evento-title">Último evento registrado</h3>
            <p id="ultimo-evento-body" class="ultimo-evento-body"></p>
          </div>
          <p id="summary-fallback" class="summary-fallback"></p>
        </div>
      </section>

      <section id="explorar" class="section explore-section">
        <div class="section-inner">
          <h2 class="section-title">O que você pode acompanhar</h2>
          <p class="section-lead">
            Em breve, telas dedicadas — a base de dados e a API já estão preparadas no servidor.
          </p>
          <ul class="feature-grid">
            <li class="feature-card">
              <span class="feature-icon-wrap" aria-hidden="true"><i data-lucide="swords"></i></span>
              <h3 class="feature-title">Lutadores</h3>
              <p class="feature-text">Nome, cartel, divisão e nacionalidade.</p>
            </li>
            <li class="feature-card">
              <span class="feature-icon-wrap" aria-hidden="true"><i data-lucide="calendar-days"></i></span>
              <h3 class="feature-title">Eventos</h3>
              <p class="feature-text">Cards e PPV com cidade, data e lutas.</p>
            </li>
            <li class="feature-card">
              <span class="feature-icon-wrap" aria-hidden="true"><i data-lucide="scale"></i></span>
              <h3 class="feature-title">Divisões</h3>
              <p class="feature-text">Pesos e categorias.</p>
            </li>
            <li class="feature-card">
              <span class="feature-icon-wrap" aria-hidden="true"><i data-lucide="trophy"></i></span>
              <h3 class="feature-title">Cinturões & lutas</h3>
              <p class="feature-text">Método, rounds e cinturão em jogo.</p>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-footer-inner">
        <p class="footer-copy">UFC Manager — projeto acadêmico de gestão de MMA.</p>
        <p class="footer-tech" id="footer-tech"></p>
      </div>
    </footer>
  </div>`;
}

function setConnBadge(el: HTMLSpanElement | null, ok: boolean, label: string) {
  if (!el) return;
  el.textContent = label;
  el.classList.toggle("is-online", ok);
  el.classList.toggle("is-offline", !ok);
}

export function mountHomePage(root: HTMLElement): void {
  root.innerHTML = template();
  createIcons({
    icons: {
      users: Users,
      "layout-grid": LayoutGrid,
      tv: Tv,
      swords: Swords,
      "calendar-days": CalendarDays,
      scale: Scale,
      trophy: Trophy,
    },
  });

  const connBadge = document.querySelector<HTMLSpanElement>("#conn-badge");
  const statLutadores = document.querySelector<HTMLSpanElement>("#stat-lutadores");
  const statCards = document.querySelector<HTMLSpanElement>("#stat-cards");
  const statPpv = document.querySelector<HTMLSpanElement>("#stat-ppv");
  const ultimoEventoBlock = document.querySelector<HTMLDivElement>("#ultimo-evento");
  const ultimoEventoBody = document.querySelector<HTMLParagraphElement>("#ultimo-evento-body");
  const summaryFallback = document.querySelector<HTMLParagraphElement>("#summary-fallback");
  const footerTech = document.querySelector<HTMLParagraphElement>("#footer-tech");

  fetchHealth()
    .then((data) => {
      setConnBadge(connBadge, true, "Conectado");
      if (footerTech) footerTech.textContent = `Serviço: ${data.service ?? "API"}`;
    })
    .catch(() => {
      setConnBadge(connBadge, false, "Offline");
      if (footerTech) {
        footerTech.textContent = "Inicie o backend em :8080 para dados ao vivo.";
      }
    });

  fetchHomeSummary()
    .then((s) => {
      if (statLutadores) statLutadores.textContent = String(s.totalLutadores);
      if (statCards) statCards.textContent = String(s.totalCards);
      if (statPpv) statPpv.textContent = String(s.totalCardsPpv);

      if (s.ultimoEvento && ultimoEventoBlock && ultimoEventoBody) {
        const u = s.ultimoEvento;
        const tipo = u.tipo === "PPV" ? "Pay-per-view" : "Card";
        ultimoEventoBody.innerHTML = `
        <strong>${tipo}</strong> · ${u.cidade}, ${u.pais}<br />
        <time datetime="${u.dataEvento}">${formatarDataBr(u.dataEvento)}</time>`;
        ultimoEventoBlock.hidden = false;
      } else if (ultimoEventoBlock) {
        ultimoEventoBlock.hidden = true;
      }

      if (summaryFallback) {
        summaryFallback.textContent =
          s.totalLutadores === 0 && s.totalCards === 0 && s.totalCardsPpv === 0
            ? "Quando houver cadastros, os totais e o último evento aparecem aqui automaticamente."
            : "";
      }
    })
    .catch((e: unknown) => {
      if (statLutadores) statLutadores.textContent = "—";
      if (statCards) statCards.textContent = "—";
      if (statPpv) statPpv.textContent = "—";
      if (summaryFallback) {
        summaryFallback.textContent =
          e instanceof Error
            ? e.message
            : "Não foi possível carregar o resumo. Verifique a API.";
        summaryFallback.classList.add("is-error");
      }
    });
}
