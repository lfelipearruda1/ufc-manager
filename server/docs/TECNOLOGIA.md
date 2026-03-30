# Escolhas de tecnologia — UFC Manager

## Pacote Java (`com.ufc`)

O código do servidor fica em [`src/main/java/com/ufc/`](../src/main/java/com/ufc/): `com` e `ufc` formam o pacote raiz do app (domínio invertido enxuto). Não há pasta extra `manager` — o nome do projeto já está no artefato Maven (`ufc-manager-server`).

### Organização de pacotes (camadas)

| Pacote / pasta | Papel |
|----------------|--------|
| [`server/database/`](../database/) | **SQL:** DDL versionado (`migrations/`). Ver [README](../database/README.md). |
| `config` | Configuração Spring (ex.: CORS). |
| `web` | Controllers REST — delegam a `module.*`. |
| `module.*` | Lógica de negócio por área (ex.: `module.home` para resumo da página inicial). |
| `persistence` | Repositórios Spring Data. |
| `persistence.entity.*` | Entidades JPA alinhadas às tabelas do SQL (`divisao`, `lutador`, `cinturao`, `evento`, `luta`). |

## Banco de dados

| Ambiente | SGBD | Uso |
|----------|------|-----|
| **Desenvolvimento local (padrão)** | **H2** em memória | `spring-boot-starter-data-jpa` + JDBC URL em `application.properties`; Flyway aplica o mesmo DDL. |
| **PostgreSQL local (Postico / máquina)** | **PostgreSQL** | Perfil **`postgres`**: credenciais padrão em [`application-postgres.properties`](../src/main/resources/application-postgres.properties) (banco `ufc_manager`, host `localhost:5432`). Sobrescreva com `SPRING_DATASOURCE_*` se precisar. |
| **Docker (opcional)** | **PostgreSQL 16** | `docker-compose.yml` na raiz do repo — usuário/senha `ufc`/`ufc`; ajuste o perfil ou as env vars se usar o container em vez do Postgres local. |

**Motivo:** PostgreSQL é amplamente usado em projetos Java e o H2 permite subir a API sem instalar servidor. O script Flyway em `db/migration` usa SQL compatível com **H2 (modo legível)** e **PostgreSQL** para tipos comuns (`BIGINT`, `IDENTITY`, `CHECK`).

Se o professor exigir **MySQL**, revisar tipos (`DOUBLE`, `DATE`, `IDENTITY`) e rodar testes de migração.

## Autenticação — primeira entrega

**Default:** **sem autenticação** (API aberta para CRUD/acadêmico).

**Quando incluir:** Spring Security + JWT ou sessão, após fechar requisitos. Até lá, não adicionar dependência de security para manter o escopo mínimo.

## Migrações

**Flyway** lê os scripts SQL de [`server/database/migrations/`](../database/migrations/) (copiados para o classpath em build). Detalhes e como rodar o SQL no Postico: [`server/database/README.md`](../database/README.md). JPA em **`ddl-auto=validate`** — não gera tabelas pelo Java.
