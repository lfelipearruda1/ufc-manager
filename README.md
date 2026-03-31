# UFC Manager

Aplicação web para **acompanhar o universo de eventos e lutadores** no estilo UFC: divisões de peso, cards (Fight Night e PPV), lutas no card e uma visão geral dos números do sistema. O projeto nasce como trabalho acadêmico integrando **banco de dados relacional**, **API** e **interface web**.

## O que você pode fazer

- **Painel** — totais (lutadores, divisões, eventos, lutas) e gráficos, como distribuição de lutadores por divisão e comparação de lutas em Fight Night versus PPV.
- **Agenda** — lista de eventos futuros; ao selecionar um evento, vê-se o card com as lutas, divisões e indicação de cinturão em jogo, quando houver.
- **Lutadores e divisões** — consulta aos cadastros existentes no banco, com filtro de lutadores por divisão.
- **Favoritos** — monte uma lista pessoal de lutadores escolhendo entre os que já existem no sistema; ela fica guardada no seu navegador.

Os dados exibidos vêm do que estiver registrado no banco (eventos, lutas, vínculos entre lutadores e cards, etc.). Não há simulação fictícia na interface: o foco é refletir o modelo de dados e a API de forma coerente.

## Ideia do sistema

O domínio cobre **divisões**, **lutadores**, **eventos** (Fight Night ou PPV), **lutas** (sempre ligadas a um único tipo de evento), **juízes**, **visibilidade no card** (preliminar, principal, main event…) e a relação **possui**, que associa desafiante, desafiado e, opcionalmente, disputa de cinturão. O desenho completo das tabelas está nas migrações SQL do repositório (ver pasta `server/database`).

## Como rodar (visão geral)

1. **Banco** — PostgreSQL (ou outro SGBD compatível com o que a API espera), com o esquema aplicado pelas migrações Flyway ao subir o servidor, ou executando os scripts SQL na ordem correta num banco vazio.
2. **API** — servidor Spring Boot em `server/`; configure URL do banco e perfil adequado (por exemplo `postgres`).
3. **Site** — cliente em `client/` (Vite); em desenvolvimento, o front costuma rodar em `http://localhost:5173` e conversa com a API em outra porta, conforme configuração de CORS e URL base.

Instruções mais detalhadas sobre o **DDL**, Flyway e execução manual do SQL estão em **`server/database/README.md`**.

## Estrutura do repositório (alto nível)

| Pasta | Papel |
|--------|--------|
| `server/` | API REST e regras de acesso aos dados |
| `client/` | Interface web (TypeScript, Vite) |
| `server/database/migrations/` | Scripts SQL versionados que definem o modelo relacional |

---

*UFC Manager — projeto acadêmico (banco de dados, API e front-end).*
