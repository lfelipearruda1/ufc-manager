# UFC Manager

Aplicação web para **acompanhar o universo de eventos e lutadores** no estilo UFC: divisões de peso, cards (Fight Night e PPV), lutas no card e uma visão geral dos números do sistema. O projeto nasce como trabalho acadêmico integrando **banco de dados relacional**, **API** e **interface web**.

## O que você pode fazer

- **Lutadores e divisões** — consulta aos cadastros de lutadores e das divisões existentes no banco, com filtro de lutadores por divisão.

Os dados exibidos vêm do que estiver registrado no banco. Não há simulação fictícia na interface: o foco é refletir o modelo de dados e a API de forma coerente.

## Ideia do sistema

O domínio cobre **divisões**, **lutadores**, **eventos** (Fight Night ou PPV), **lutas** (sempre ligadas a um único tipo de evento), **visibilidade no card** (Preliminar, Co Main, Main) e a relação **possui**, que associa desafiante, desafiado e, opcionalmente, disputa de cinturão. O desenho completo das tabelas está nas migrações SQL do repositório (ver pasta `server/database`).

## Como rodar (visão geral)

1. Clonar o repositório
2. Abrir dois terminais
3. Primeiro terminal -> Mudar o diretório para `client/` , onde vai rodar o front:
   
```java
     cd client
     npm run dev
```

4. Segundo terminal -> Mudar o diretório para `server/` , onde vai rodar o back:

```java
     cd server
     mvn spring-boot:run
 ```
5. Clicar na URL que aparecer no **primeiro** terminal, que deve ser algo como:

```java
      http://localhost:5173/
 ```

Instruções mais detalhadas sobre o **DDL**, Flyway e execução manual do SQL estão em **`server/database/README.md`**.

## Estrutura do repositório (alto nível)

| Pasta | Papel |
|--------|--------|
| `server/` | API REST e regras de acesso aos dados |
| `client/` | Interface web (TypeScript, Vite) |
| `server/database/migrations/` | Scripts SQL versionados que definem o modelo relacional |

---

*UFC Manager — projeto acadêmico (banco de dados, API e front-end).*
